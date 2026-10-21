import Link from 'next/link';
import MobileMenu from './MobileMenu';
import styles from './LegacyHeader.module.css';

// Floating header bar: the menu button on the left (phones), the wordmark in the middle.
// ThemeSwitcher, BackButton and BackToCurrent are fixed elements that sit on top of it.
export default function LegacyHeader() {
    return (
        <header className={styles.bar}>
            <MobileMenu />
            <Link href="/v0" className={styles.wordmark}>
                <span className="v0-rise">
                    <span>JMAN.</span>
                </span>
            </Link>
        </header>
    );
}
