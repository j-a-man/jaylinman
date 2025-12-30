'use client';

import React, { useEffect, useState } from 'react';

const DebugScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    const [classes, setClasses] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setClasses(document.body.className);
        };

        window.addEventListener('scroll', handleScroll);
        // Update on interval to catch class changes even if not scrolling (e.g. init)
        const interval = setInterval(() => {
            setClasses(document.body.className);
            setScrollY(window.scrollY);
        }, 500);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '10px',
            zIndex: 99999,
            fontSize: '12px',
            pointerEvents: 'none'
        }}>
            <p>ScrollY: {scrollY}</p>
            <p>Body Classes: {classes}</p>
        </div>
    );
};

export default DebugScroll;
