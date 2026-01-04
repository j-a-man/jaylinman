'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import styles from './MobileMenu.module.css';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Wait for mount to access document
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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
        setIsOpen(!isOpen);
    };

    // The Overlay component to be portaled
    const MenuOverlay = () => (
        <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}>
            <button
                className="btn-back"
                type="button"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 1001, display: 'block' }}
            >
                <span className="btn-box">
                    <span className="icon-close"></span>
                </span>
            </button>

            <nav className={styles.navLinks}>
                <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
                <Link href="/about" className={styles.navLink} onClick={() => setIsOpen(false)}>About</Link>
                <Link href="/cs-projects" className={styles.navLink} onClick={() => setIsOpen(false)}>CS Projects</Link>
                <Link href="/resume" className={styles.navLink} onClick={() => setIsOpen(false)}>Resume</Link>
                <Link href="/graphics" className={styles.navLink} onClick={() => setIsOpen(false)}>Graphics</Link>
                <Link href="/contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contact</Link>
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
                role="button"
                aria-label="Menu"
                onClick={toggleMenu}
                style={{ zIndex: 1002, position: 'relative' }} // Ensure it's above overlay if not using portal, but now we are.
            >
                <span className="mobile-nav-box">
                    <span className={`mobile-nav-inner ${isOpen ? 'open' : ''}`}></span>
                </span>
            </button>

            {/* Portal the overlay to document.body to escape stacking contexts */}
            {mounted && createPortal(<MenuOverlay />, document.body)}

            {/* Global style override for the hamburger icon animation when open */}
            <style jsx global>{`
                .mobile-nav-inner.open {
                    background-color: transparent !important;
                }
                .mobile-nav-inner.open:before {
                    transform: rotate(45deg);
                    top: 0;
                    background-color: #fff !important;
                    position: fixed; /* Fix for when button is in header but overlay is portaled */
                    z-index: 1003;
                }
                .mobile-nav-inner.open:after {
                    transform: rotate(-45deg);
                    bottom: 0;
                    background-color: #fff !important;
                     position: fixed;
                     z-index: 1003;
                }
            `}</style>
        </>
    );
};

export default MobileMenu;
