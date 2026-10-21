import Link from 'next/link';
import styles from './BackToCurrent.module.css';

// The way home from the easter egg. The current site is a separate root layout, so this is a full page load.
export default function BackToCurrent() {
    return (
        <Link href="/" prefetch={false} className={styles.pill}>
            <span className={styles.detached} aria-hidden="true">
                HEAD detached at v0
            </span>
            <span className={styles.dot} aria-hidden="true">
                ·
            </span>
            <span className={styles.back}>back to </span>
            <span>v1</span>
            <span className={styles.srOnly}>, the current site</span>
            <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
        </Link>
    );
}
