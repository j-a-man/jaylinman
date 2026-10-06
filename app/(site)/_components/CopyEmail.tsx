'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CopyEmail.module.css';

const RESET_MS = 1600;

export default function CopyEmail({ email }: { email: string }) {
    const [status, setStatus] = useState<'idle' | 'copied' | 'selected'>('idle');
    const linkRef = useRef<HTMLAnchorElement>(null);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (resetTimer.current) clearTimeout(resetTimer.current);
    }, []);

    const showStatus = (next: 'copied' | 'selected') => {
        setStatus(next);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setStatus('idle'), RESET_MS);
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            showStatus('copied');
        } catch {
            // No clipboard access: select the address so it can be copied by hand
            const link = linkRef.current;
            const selection = window.getSelection();
            if (link && selection) {
                const range = document.createRange();
                range.selectNodeContents(link);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            showStatus('selected');
        }
    };

    return (
        <p className={styles.row}>
            <a ref={linkRef} href={`mailto:${email}`} className={styles.email}>
                {email}
            </a>
            <button type="button" className={`${styles.copy} mono`} onClick={copy} data-print="hide">
                {status === 'copied' ? 'copied' : status === 'selected' ? 'selected' : 'copy'}
                <span className="sr-only"> email address</span>
            </button>
            <span className="sr-only" aria-live="polite">
                {status === 'copied' ? 'Email copied' : status === 'selected' ? 'Email selected' : ''}
            </span>
        </p>
    );
}
