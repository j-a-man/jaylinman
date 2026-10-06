import styles from './Arrow.module.css';

const PATHS = {
    right: 'M2 8h11M9 4l4 4-4 4',
    'up-right': 'M4.5 11.5l7-7M5.5 4.5h6v6',
    up: 'M8 13.5V2.5M4 6.5l4-4 4 4',
};

// Text arrows (→ ↗) are missing from the Google Fonts latin subset, so every arrow is this SVG
type ArrowProps = {
    direction?: keyof typeof PATHS;
    /** Small gap before the arrow, so link underlines stop at the word */
    trailing?: boolean;
};

export default function Arrow({ direction = 'right', trailing }: ArrowProps) {
    return (
        <svg className={`${styles.arrow} ${trailing ? styles.trailing : ''}`} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d={PATHS[direction]} />
        </svg>
    );
}
