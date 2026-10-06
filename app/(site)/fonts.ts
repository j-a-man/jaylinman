import { Geist_Mono, Instrument_Sans, Newsreader } from 'next/font/google';

export const sans = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

export const mono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});

// One italic phrase in the hero
export const serif = Newsreader({
    subsets: ['latin'],
    style: 'italic',
    weight: '400',
    variable: '--font-serif',
    display: 'swap',
});

export const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable}`;
