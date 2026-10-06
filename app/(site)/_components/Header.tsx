'use client';

import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

const LINKS = [
    { id: 'work', label: 'work' },
    { id: 'projects', label: 'projects' },
    { id: 'beyond', label: 'beyond' },
    { id: 'contact', label: 'contact' },
];

export default function Header() {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Hairline under the header once the page has moved
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    // Scroll-spy: the section crossing the middle of the viewport is current
    useEffect(() => {
        const sections = LINKS.map(link => document.getElementById(link.id)).filter((s): s is HTMLElement => s !== null);
        const visible = new Set<string>();
        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) visible.add(entry.target.id);
                    else visible.delete(entry.target.id);
                }
                setActiveId(LINKS.find(link => visible.has(link.id))?.id ?? null);
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} data-print="hide">
                <div className={`container ${styles.row}`}>
                    <a className={styles.wordmark} href="#top">
                        <span className={styles.full}>jaylin man</span>
                        <span className={styles.short} aria-hidden="true">jm</span>
                    </a>
                    <div className={styles.end}>
                        <nav aria-label="Sections">
                            <ul className={styles.links}>
                                {LINKS.map(link => (
                                    <li key={link.id}>
                                        <a
                                            href={`#${link.id}`}
                                            className={styles.link}
                                            aria-current={activeId === link.id ? 'true' : undefined}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
        </>
    );
}
