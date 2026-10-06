'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './GenesisLink.module.css';

const COMMAND = '$ git checkout v0';
const TYPE_MS = 18;
const RESULT_DELAY_MS = 120;
const NAVIGATE_MS = 750;

type Phase = 'idle' | 'typing' | 'done';

// The easter egg: the changelog rail's end cap is the initial commit, and the old site is v0.
// It is a real link, so modifier clicks, middle clicks and no-JS all still reach /v0.
// /v0 has its own root layout, so the router does a full page load there.
export default function GenesisLink() {
    const router = useRouter();
    const [phase, setPhase] = useState<Phase>('idle');
    const [typed, setTyped] = useState('');
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        const clearTimers = () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
        // Coming back with the browser's back button can restore this page mid-animation
        const onPageShow = (event: PageTransitionEvent) => {
            if (!event.persisted) return;
            clearTimers();
            setPhase('idle');
            setTyped('');
        };
        window.addEventListener('pageshow', onPageShow);
        return () => {
            window.removeEventListener('pageshow', onPageShow);
            clearTimers();
        };
    }, []);

    const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (phase !== 'idle') return;

        try {
            localStorage.setItem('found-v0', '1');
        } catch {
            // Storage blocked: the visit still works, the ring just won't remember
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            router.push('/v0');
            return;
        }

        setPhase('typing');
        for (let i = 1; i <= COMMAND.length; i++) {
            timers.current.push(setTimeout(() => setTyped(COMMAND.slice(0, i)), i * TYPE_MS));
        }
        timers.current.push(setTimeout(() => setPhase('done'), COMMAND.length * TYPE_MS + RESULT_DELAY_MS));
        timers.current.push(setTimeout(() => router.push('/v0'), NAVIGATE_MS));
    };

    return (
        <Link href="/v0" prefetch={false} rel="nofollow" className={styles.genesis} data-phase={phase} data-print="hide" onClick={onClick}>
            <span className={`${styles.label} mono`}>
                {phase === 'idle' ? (
                    'v0 · initial commit'
                ) : (
                    <>
                        <span className={styles.command}>{typed}</span>
                        {phase === 'done' && <span className={styles.result}>HEAD is now at v0 (the old site)</span>}
                    </>
                )}
            </span>
            <span className="sr-only">, the previous version of this site</span>
        </Link>
    );
}
