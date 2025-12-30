'use client';

import React, { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Check initial state
        if (document.body.classList.contains('night-mode')) {
            setIsDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.body.classList.remove('night-mode');
            setIsDarkMode(false);
        } else {
            document.body.classList.add('night-mode');
            setIsDarkMode(true);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '40px',
            right: '60px',
            zIndex: 9999,
            width: '40px',
            height: '40px',
            overflow: 'hidden'
        }}>
            <button
                onClick={toggleTheme}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Toggle Theme"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    transform: 'translateY(120%)',
                    animation: 'h 1s forwards 0.8s',
                    transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                    background: isHovered
                        ? (isDarkMode ? '#fff' : '#000')
                        : (isDarkMode ? '#142641' : '#fff'),
                    color: isHovered
                        ? (isDarkMode ? '#142641' : '#fff')
                        : (isDarkMode ? '#fff' : '#000'),
                    border: `1px solid ${isHovered
                        ? (isDarkMode ? '#fff' : '#000')
                        : (isDarkMode ? '#fff' : '#000')}` // Border matches the text color logic usually or inverse of bg
                }}
            >
                {isDarkMode ? (
                    // Moon Icon
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                ) : (
                    // Sun Icon
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                )}
            </button>
        </div>
    );
}
