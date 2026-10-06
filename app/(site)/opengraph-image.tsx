import { ImageResponse } from 'next/og';
import { hero, person } from './_content';
import { version } from './version';

export const alt = 'Jaylin Man';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Pull just the glyphs we draw from Google Fonts at build time; fall back to the default face offline
async function loadFont(family: string, weight: number, text: string) {
    try {
        const css = await (
            await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`)
        ).text();
        const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
        if (!url) return null;
        return await (await fetch(url)).arrayBuffer();
    } catch {
        return null;
    }
}

export default async function OpenGraphImage() {
    const kicker = `jaylinman.com · ${version}`;
    const lead = `${hero.leadBefore}${hero.leadSerif}${hero.leadAfter.split('.')[0]}.`;
    const [sans, sansBold, mono] = await Promise.all([
        loadFont('Instrument Sans', 400, lead),
        loadFont('Instrument Sans', 600, person.name),
        loadFont('Geist Mono', 400, kicker),
    ]);
    const fonts = [
        sans && { name: 'Instrument Sans', data: sans, weight: 400 as const },
        sansBold && { name: 'Instrument Sans', data: sansBold, weight: 600 as const },
        mono && { name: 'Geist Mono', data: mono, weight: 400 as const },
    ].filter((font): font is NonNullable<typeof font> => Boolean(font));

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    background: '#faf4ed',
                    padding: '88px 96px',
                    fontFamily: 'Instrument Sans',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 56, paddingTop: 10 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: '#286983' }} />
                    <div style={{ width: 2, height: 96, background: '#cecacd' }} />
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: '#8a8599' }} />
                    <div style={{ width: 2, height: 96, background: '#cecacd' }} />
                    <div style={{ width: 18, height: 18, borderRadius: 9, border: '3px solid #8a8599', background: '#faf4ed' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontFamily: 'Geist Mono', fontSize: 26, color: '#6b6685' }}>{kicker}</div>
                    <div style={{ fontSize: 104, fontWeight: 600, color: '#3e3a5c', letterSpacing: '-0.03em', marginTop: 16 }}>{person.name}</div>
                    <div style={{ fontSize: 38, lineHeight: 1.4, color: '#575279', marginTop: 28, maxWidth: 860 }}>{lead}</div>
                </div>
            </div>
        ),
        { ...size, fonts }
    );
}
