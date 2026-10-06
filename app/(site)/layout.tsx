import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { person } from './_content';
import { fontVariables } from './fonts';
import { THEME_BG } from './theme';
import './tokens.css';

export const metadata: Metadata = {
    metadataBase: new URL(person.site),
    title: person.name,
    description: person.description,
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        url: '/',
        siteName: person.name,
        title: person.name,
        description: person.description,
    },
    twitter: {
        card: 'summary_large_image',
        title: person.name,
        description: person.description,
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: THEME_BG.light },
        { media: '(prefers-color-scheme: dark)', color: THEME_BG.dark },
    ],
};

// Runs before first paint: applies the saved theme (or the OS one) and the v0 finder flag,
// so there is never a flash of the wrong theme.
const prePaint = `(function(){var d=document.documentElement;try{var s=localStorage.getItem('theme');var saved=s==='light'||s==='dark';var t=saved?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=t;if(saved)document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute('content',t==='dark'?'${THEME_BG.dark}':'${THEME_BG.light}')});if(localStorage.getItem('found-v0'))d.dataset.foundV0='';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={fontVariables} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: prePaint }} />
            </head>
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
