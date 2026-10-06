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
            <button
                className="btn-back"
                type="button"
                aria-label="Close"
                onClick={close}
                style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 1001, display: 'block' }}
            >
                <span className="btn-box">
                    <span className="icon-close"></span>
                </span>
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
            {/*
              Hamburger Button
              Uses global 'mobile-nav' class for styling.
              Adds local 'hideOnMobileHome' class for logic.
            */}
            <button
                className={`mobile-nav ${isHome ? styles.hideOnMobileHome : ''}`}
                type="button"
                aria-label="Menu"
                aria-expanded={isOpen}
                onClick={toggleMenu}
                style={{ zIndex: 1002, position: 'relative' }}
            >
                <span className="mobile-nav-box">
                    <span className={`mobile-nav-inner ${isOpen ? 'open' : ''}`}></span>
                </span>
            </button>

            {/* Portal the overlay to document.body to escape stacking contexts */}
            {mounted && createPortal(menuOverlay, document.body)}

        </>
    );
};

export default MobileMenu;
