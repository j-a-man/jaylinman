import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { fontVariables } from './(site)/fonts';
import './(site)/tokens.css';
import styles from './global-not-found.module.css';

export const metadata: Metadata = {
    title: 'Page not found - Jaylin Man',
};

const prePaint = `(function(){try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')document.documentElement.dataset.theme=s;}catch(e){}})();`;

// Shared 404 for both root layouts (the current site and /v0)
export default function GlobalNotFound() {
    return (
        <html lang="en" className={fontVariables} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: prePaint }} />
            </head>
            <body>
                <main className={`container ${styles.main}`}>
                    <p className={`${styles.kicker} mono`}>404</p>
                    <h1 className={styles.title}>This page didn&apos;t make it to v1.</h1>
                    <p className={styles.back}>
                        <Link href="/">Back to the current site</Link>
                    </p>
                </main>
                <Analytics />
            </body>
        </html>
    );
}
