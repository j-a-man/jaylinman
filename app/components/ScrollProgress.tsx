'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const [showArrow, setShowArrow] = React.useState(false);

    // Monitor scroll progress to toggle arrow visibility
    React.useEffect(() => {
        return scrollYProgress.on('change', (latest) => {
            setShowArrow(latest > 0.05); // Show after 5% scroll
        });
    }, [scrollYProgress]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                zIndex: 19000,
                pointerEvents: showArrow ? 'auto' : 'none',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: showArrow ? 'pointer' : 'default',
                opacity: showArrow ? 1 : 0,
                transform: showArrow ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
        >
            <svg width="54" height="54" viewBox="0 0 54 54" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background Track */}
                <circle
                    cx="27"
                    cy="27"
                    r="25"
                    stroke="var(--scroll-track)"
                    strokeWidth="2"
                    fill="none"
                />
                {/* Progress Indicator */}
                <motion.circle
                    cx="27"
                    cy="27"
                    r="25"
                    stroke="var(--scroll-ring)"
                    strokeWidth="2"
                    fill="none"
                    style={{ pathLength: scrollYProgress }}
                />
            </svg>

            {/* Up Arrow Icon */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--scroll-ring)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
            </svg>
        </div>
    );
}
