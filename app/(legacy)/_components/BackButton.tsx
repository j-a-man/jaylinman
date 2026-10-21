'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BackButton.module.css';

// Round arrow pinned in the header bar, left of the theme switch. Project pages go back to the
// project list; every other page goes home. The home page itself has no back button.
export default function BackButton() {
    const pathname = usePathname();
    if (pathname === '/v0') return null;

    const toProjects = pathname.startsWith('/v0/cs-projects/');
    return (
        <Link href={toProjects ? '/v0/cs-projects' : '/v0'} className={styles.button} aria-label={toProjects ? 'Back to projects' : 'Back to home'}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M20 12H5M11 5.5 4.5 12l6.5 6.5" />
            </svg>
        </Link>
    );
}
