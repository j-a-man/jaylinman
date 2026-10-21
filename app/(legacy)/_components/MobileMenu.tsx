'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import styles from './MobileMenu.module.css';

const noopSubscribe = () => () => {};

const MobileMenu = () => {
    const pathname = usePathname();
    const isHome = pathname === '/v0';

    // The portal target only exists in the browser
    const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

    // Remember which page the menu was opened on, so navigating anywhere closes it
    const [openedOn, setOpenedOn] = useState<string | null>(null);
    const isOpen = openedOn === pathname;
    const close = () => setOpenedOn(null);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setOpenedOn(isOpen ? null : pathname);
    };

    // The overlay to be portaled
    const menuOverlay = (
        <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}>
            <button className={styles.close} type="button" aria-label="Close menu" onClick={close}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6 6l12 12M18 6 6 18" />
                </svg>
            </button>

            <nav className={styles.navLinks}>
                <Link href="/v0" className={styles.navLink} onClick={close}>Home</Link>
                <Link href="/v0/about" className={styles.navLink} onClick={close}>About</Link>
                <Link href="/v0/cs-projects" className={styles.navLink} onClick={close}>CS Projects</Link>
                <Link href="/v0/resume" className={styles.navLink} onClick={close}>Resume</Link>
                <Link href="/v0/graphics" className={styles.navLink} onClick={close}>Graphics</Link>
                <Link href="/v0/contact" className={styles.navLink} onClick={close}>Contact</Link>
            </nav>
        </div>
    );

    return (
        <>
            {/* Menu button: phones only, and hidden on the home page where the links are the page */}
            <button
                className={`${styles.toggle} ${isHome ? styles.hideOnMobileHome : ''}`}
                type="button"
                aria-label="Menu"
                aria-expanded={isOpen}
                onClick={toggleMenu}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M4 8h16M4 16h16" />
                </svg>
            </button>

            {/* Portal the overlay to document.body to escape stacking contexts */}
            {mounted && createPortal(menuOverlay, document.body)}

        </>
    );
};

export default MobileMenu;
