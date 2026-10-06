import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const MAX_BODY_BYTES = 20_000;

// Abuse limits. These are in-memory, so each serverless instance keeps its own
// windows: they blunt bursts, not a determined distributed attacker. What makes the
// form useless as a relay is that the auto-reply has fixed text, goes to exactly one
// bare address with no display name, and is capped per recipient and per hour.
const SUBMIT_LIMIT = 3;
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;
const AUTO_REPLY_WINDOW_MS = 24 * 60 * 60 * 1000;
const AUTO_REPLY_HOURLY_LIMIT = 20;
const HOUR_MS = 60 * 60 * 1000;
const PRUNE_INTERVAL_MS = 60 * 1000;
const MAX_TRACKED = 10_000;

const submissionsByIp = new Map<string, number[]>();
const lastAutoReplyByEmail = new Map<string, number>();
let autoRepliesThisHour: number[] = [];
let lastPrune = 0;

// A bare addr-spec only. Display names, groups and lists ("Name <a@b.co>", "g:a@b.co;",
// "a,b@c.co") are rejected so the reply can never carry sender-written text.
const EMAIL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/;

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function clientIp(req: Request) {
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return req.headers.get('x-real-ip') ?? 'unknown';
}

// Drop expired entries so the maps stay small on long-lived instances
function prune(now: number) {
    if (now - lastPrune < PRUNE_INTERVAL_MS) return;
    lastPrune = now;
    for (const [ip, times] of submissionsByIp) {
        const recent = times.filter(t => now - t < SUBMIT_WINDOW_MS);
        if (recent.length === 0) submissionsByIp.delete(ip);
        else submissionsByIp.set(ip, recent);
    }
    for (const [key, last] of lastAutoReplyByEmail) {
        if (now - last >= AUTO_REPLY_WINDOW_MS) lastAutoReplyByEmail.delete(key);
    }
}

// Maps iterate in insertion order, so the first keys are the oldest
function capSize<V>(map: Map<string, V>) {
    for (const key of map.keys()) {
        if (map.size <= MAX_TRACKED) break;
        map.delete(key);
    }
}

function isRateLimited(ip: string, now: number) {
    const recent = (submissionsByIp.get(ip) ?? []).filter(t => now - t < SUBMIT_WINDOW_MS);
    if (recent.length >= SUBMIT_LIMIT) {
        submissionsByIp.set(ip, recent);
        return true;
    }
    recent.push(now);
    submissionsByIp.set(ip, recent);
    capSize(submissionsByIp);
    return false;
}

// "you+1@x.com" and "you+2@x.com" reach the same inbox
function recipientKey(email: string) {
    const [local, domain] = email.split('@');
    return `${local.split('+')[0]}@${domain}`;
}

function shouldAutoReply(email: string, now: number) {
    autoRepliesThisHour = autoRepliesThisHour.filter(t => now - t < HOUR_MS);
    if (autoRepliesThisHour.length >= AUTO_REPLY_HOURLY_LIMIT) return false;

    const key = recipientKey(email);
    const last = lastAutoReplyByEmail.get(key);
    if (last !== undefined && now - last < AUTO_REPLY_WINDOW_MS) return false;

    lastAutoReplyByEmail.set(key, now);
    capSize(lastAutoReplyByEmail);
    autoRepliesThisHour.push(now);
    return true;
}

function isCrossOrigin(req: Request) {
    const origin = req.headers.get('origin');
    if (!origin) return false;
    try {
        return new URL(origin).host !== req.headers.get('host');
    } catch {
        return true;
    }
}

function readField(body: Record<string, unknown>, key: string) {
    const value = body[key];
    return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: Request) {
    try {
        // 1. Reject cross-site posts and oversized bodies before parsing
        if (isCrossOrigin(req)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
            return NextResponse.json({ error: 'Message is too long' }, { status: 413 });
        }

        let body: Record<string, unknown>;
        try {
            const parsed = await req.json();
            if (!parsed || typeof parsed !== 'object') throw new Error('Body is not an object');
            body = parsed as Record<string, unknown>;
        } catch {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        // 2. Honeypot: real visitors never see or fill this field
        if (readField(body, 'website')) {
            return NextResponse.json({ success: true });
        }

        // 3. Validation
        const name = readField(body, 'name').replace(/\s+/g, ' ');
        const email = readField(body, 'email').toLowerCase();
        const message = readField(body, 'message');

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Please fill out every field' }, { status: 400 });
        }
        if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
            return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
        }
        if (!EMAIL_PATTERN.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
        }

        const now = Date.now();
        prune(now);
        if (isRateLimited(clientIp(req), now)) {
            return NextResponse.json(
                { error: 'Too many messages. Please try again in a few minutes.' },
                { status: 429 }
            );
        }

        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;
        if (!user || !pass) {
            console.error('Email Error: EMAIL_USER or EMAIL_PASS is not set');
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        // 4. Configure Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass },
        });

        // 5. Email to Owner. Sender text is escaped and only ever goes to the owner.
        await transporter.sendMail({
            from: user,
            to: user,
            replyTo: { name: '', address: email },
            subject: `New Portfolio Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f4f4f4; padding:10px; border-radius:5px; white-space:pre-wrap;">${escapeHtml(message)}</p>
      `,
        });

        // 6. Auto-Reply to the sender. Fixed text to one bare address: nothing the sender
        // typed is echoed back, so the form cannot deliver their content to a third party.
        if (shouldAutoReply(email, now)) {
            try {
                await transporter.sendMail({
                    from: user,
                    to: { name: '', address: email },
                    subject: 'Thanks for reaching out! - Jaylin Man',
                    text: `Hi there,\n\nThanks for contacting me! I've received your message and will get back to you shortly.\n\nBest,\nJaylin Man`,
                    html: `
        <p>Hi there,</p>
        <p>Thanks for contacting me! I've received your message and will get back to you shortly.</p>
        <br>
        <p>Best,</p>
        <p><strong>Jaylin Man</strong></p>
      `,
                });
            } catch (error) {
                // The owner already has the message, so a failed confirmation is not a failed submission.
                console.error('Auto-reply Error:', error);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email Error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
