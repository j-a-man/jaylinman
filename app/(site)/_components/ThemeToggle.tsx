'use client';

import { useEffect } from 'react';
import { THEME_BG } from '../theme';
import styles from './ThemeToggle.module.css';

type Theme = keyof typeof THEME_BG;

const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function readStored(): Theme | null {
    try {
        const stored = localStorage.getItem('theme');
        return stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
        return null;
    }
}

function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute('content', THEME_BG[theme]));
}

// No React state: the pre-paint script sets data-theme, and CSS picks which word shows,
// so the server render and the first client render always match.
export default function ThemeToggle() {
    useEffect(() => {
        const stored = readStored();
        if (stored) applyTheme(stored);

        // Follow the OS until the visitor picks a theme
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => {
            if (!readStored()) applyTheme(systemTheme());
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const toggle = () => {
        const current = (document.documentElement.dataset.theme as Theme | undefined) ?? systemTheme();
        const next: Theme = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch {
            // Private mode or blocked storage: the choice lasts for this page view
        }
    };

    return (
        <button type="button" className={`${styles.toggle} mono`} onClick={toggle}>
            <span className={styles.toDark}>
                <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M13.5 9.6A5.75 5.75 0 0 1 6.4 2.5a5.75 5.75 0 1 0 7.1 7.1Z" />
                </svg>
                <span className="sr-only">Switch to </span>
                <span className={styles.word}>moon</span>
                <span className="sr-only"> (dark) theme</span>
            </span>
            <span className={styles.toLight}>
                <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M2 11.5h12M4.5 11.5a3.5 3.5 0 0 1 7 0M8 3.5v2M3.4 6.4l1.1 1.1M12.6 6.4l-1.1 1.1M5 14h6" />
                </svg>
                <span className="sr-only">Switch to </span>
                <span className={styles.word}>dawn</span>
                <span className="sr-only"> (light) theme</span>
            </span>
        </button>
    );
}
