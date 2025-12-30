'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ScrollContextType {
    revealAbout: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
    revealAbout: false,
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const [revealAbout, setRevealAbout] = useState(false);

    useEffect(() => {
        // Identify the scroll container: either .stagePerspective (Home) or window
        const container = document.querySelector('.stagePerspective') || window;

        const handleScroll = () => {
            const currentScrollY = container === window
                ? window.scrollY
                : (container as HTMLElement).scrollTop;

            // Trigger when user scrolls down past the projects.
            const threshold = window.innerHeight * 0.9;

            if (currentScrollY > threshold) {
                // console.log('Scroll threshold reached:', currentScrollY);
                setRevealAbout(true);
                document.body.classList.add('reveal-about');
            } else {
                setRevealAbout(false);
                document.body.classList.remove('reveal-about');
            }
        };

        // Attach listener to the correct target
        container.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ScrollContext.Provider value={{ revealAbout }}>
            {children}
        </ScrollContext.Provider>
    );
};
