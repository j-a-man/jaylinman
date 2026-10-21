import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './legacy.css';
import { Archivo, Syne, Unbounded, Space_Grotesk, Tenor_Sans, Manrope } from 'next/font/google';
import ThemeSwitcher from './_components/ThemeSwitcher';
import ProfileSection from './_components/ProfileSection';
import PixelBackground from './_components/PixelBackground';
import LegacyHeader from './_components/LegacyHeader';
import BackButton from './_components/BackButton';
import BackToCurrent from './_components/BackToCurrent';

// Archivo's width axis gives the wide, heavy display type; the rest are the old site's own picks
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
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
      <body suppressHydrationWarning className={`${archivo.variable} ${syne.variable} ${unbounded.variable} ${space.variable} ${tenor.variable} ${manrope.variable}`}>
        <PixelBackground />
        <LegacyHeader />
        <BackButton />
        <ThemeSwitcher />
        <ProfileSection />

        {children}

        <BackToCurrent />
        <Analytics />
      </body>
    </html>
  );
}
