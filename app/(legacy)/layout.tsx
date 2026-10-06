import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import './v0.css';
import ScrollAnimations from './_components/ScrollAnimations';
import { Syne, Unbounded, Space_Grotesk, Tenor_Sans, Manrope } from 'next/font/google';
import ThemeSwitcher from './_components/ThemeSwitcher';
import ProfileSection from './_components/ProfileSection';
import PixelBackground from './_components/PixelBackground';
import MobileMenu from './_components/MobileMenu';
import BackToCurrent from './_components/BackToCurrent';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', display: 'swap' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });
const tenor = Tenor_Sans({ subsets: ['latin'], weight: '400', variable: '--font-tenor', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

// The previous version of the site, reachable only through the easter egg on the current one
export const metadata: Metadata = {
  title: "Jaylin Man's Portfolio (v0)",
  robots: { index: false, follow: false },
  description: 'Portfolio of Jaylin Man. Specializing in software engineering, web development, and algorithmic problem solving.',
  openGraph: {
    type: 'website',
    url: 'https://jaylinman.vercel.app',
    title: "Jaylin Man's Portfolio",
    description: 'Portfolio of Jaylin Man. Specializing in software engineering, web development, and algorithmic problem solving.',
    // images: ['/social_share.png'], // Update if you have one
  },
  twitter: {
    card: 'summary_large_image',
    site: 'Jaylin Man',
    creator: '@jaylinman',
    title: "Jaylin Man's Portfolio",
    description: 'Portfolio of Jaylin Man. Specializing in software engineering, web development, and algorithmic problem solving.',
    // images: ['/social_share.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/duo3tdm.css" />
      </head>
      <body suppressHydrationWarning className={`navTop loading first-load ${syne.variable} ${unbounded.variable} ${space.variable} ${tenor.variable} ${manrope.variable}`}>
        <ThemeSwitcher />
        <ProfileSection />
        <PixelBackground />
        <ScrollAnimations />
        <header id="navbar" className="ui">
          <Link className="logo" href="/v0">
            <span className="slideUp">
              <span>JMAN.</span>
            </span>
          </Link>
          <MobileMenu />
        </header>

        <div
          className="curtain"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1,
            backgroundColor: '#f2f2f2',
          }}
        ></div>

        {children}

        <BackToCurrent />
        <Analytics />
      </body>
    </html>
  );
}
