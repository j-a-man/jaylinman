import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // 1. Basic Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 2. Configure Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 3. Email to Owner (You)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            replyTo: email, // So you can reply directly to the user
            subject: `New Portfolio Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f4f4f4; padding:10px; border-radius:5px;">${message}</p>
      `,
        };

        // 4. Auto-Reply to User
        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thanks for reaching out! - Jaylin Man',
            text: `Hi ${name},\n\nThanks for contacting me! I've received your message and will get back to you shortly.\n\nBest,\nJaylin Man`,
            html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting me! I've received your message and will get back to you shortly.</p>
        <br>
        <p>Best,</p>
        <p><strong>Jaylin Man</strong></p>
      `,
        };

        // 5. Send Emails
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(autoReplyOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email Error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
