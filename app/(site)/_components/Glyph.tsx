import type { Glyph as GlyphName } from '../_content';
import styles from './Glyph.module.css';

// Each glyph is drawn from how the tool actually works
const GLYPHS: Record<GlyphName, React.ReactNode> = {
    // docpipe: one repo overview, three module manifests, nine file contracts
    tree: (
        <>
            <circle cx="20" cy="7" r="2.5" />
            <path d="M20 9.5v4.5M9 14h22M9 14v4M20 14v4M31 14v4" />
            <circle cx="9" cy="20.5" r="2.5" />
            <circle cx="20" cy="20.5" r="2.5" />
            <circle cx="31" cy="20.5" r="2.5" />
            <path d="M9 23v4M20 23v4M31 23v4M5.5 27h7M16.5 27h7M27.5 27h7M5.5 27v4M9 27v4M12.5 27v4M16.5 27v4M20 27v4M23.5 27v4M27.5 27v4M31 27v4M34.5 27v4" />
        </>
    ),
    // afterword: audio in, written lines out
    wave: (
        <>
            <path d="M4 17v6M8 12v16M12 15v10M16 9v22" />
            <path d="M22 14h14M22 20h14M22 26h9" />
        </>
    ),
    // kira: a five-rung risk ladder; the top two rungs are gated behind an approval
    ladder: (
        <>
            <path d="M10 5v30M24 5v30" />
            <path d="M10 31h14M10 25h14M10 19h14" />
            <path d="M10 13h14M10 7h14" strokeDasharray="2.5 2.5" />
            <path d="M28.5 9.5l2.5 2.5 5-5" />
        </>
    ),
    // visual-branches: a branch that forks off main and merges back
    branch: (
        <>
            <path d="M4 28h32" />
            <circle cx="8" cy="28" r="2.5" />
            <circle cx="20" cy="28" r="2.5" />
            <circle cx="32" cy="28" r="2.5" />
            <path d="M10.5 26.5c3-1.5 3-10.5 6-12h7c3 1.5 3 10.5 6 12" />
            <circle cx="20" cy="14.5" r="2.5" />
        </>
    ),
};

export default function Glyph({ name }: { name: GlyphName }) {
    return (
        <svg className={styles.glyph} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
            {GLYPHS[name]}
        </svg>
    );
}
