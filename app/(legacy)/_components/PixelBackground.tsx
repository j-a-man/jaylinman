'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import styles from './PixelBackground.module.css';

// Night mode lives as a class on <body>, toggled by ThemeSwitcher
const subscribeToBodyClass = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
};
const isBodyNightMode = () => document.body.classList.contains('night-mode');

const PixelBackground = () => {
    const isNightMode = useSyncExternalStore(subscribeToBodyClass, isBodyNightMode, () => false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const isMobileRef = useRef(false);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const blockSize = 50;
        const gap = 4; // Distinct pixel gap

        const checkMobile = () => {
            isMobileRef.current = window.innerWidth <= 768; // Mobile breakpoint
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            checkMobile();
        };

        window.addEventListener('resize', resize);
        resize(); // Init

        const onMouseMove = (e: MouseEvent) => {
            if (!isMobileRef.current) {
                mouseRef.current = { x: e.clientX, y: e.clientY };
            }
        };
        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;

        const render = () => {
            // Standard clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / blockSize);
            const rows = Math.ceil(canvas.height / blockSize);

            // Mobile Auto-Animation Logic
            if (isMobileRef.current) {
                timeRef.current += 0.02; // Speed of auto movement

                // Lissajous curve / Orbiting pattern for smooth random-like movement
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const amplitudeX = canvas.width * 0.35;
                const amplitudeY = canvas.height * 0.35;

                const autoX = centerX + Math.sin(timeRef.current) * amplitudeX;
                const autoY = centerY + Math.cos(timeRef.current * 0.7) * amplitudeY;

                mouseRef.current = { x: autoX, y: autoY };
            }

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Theme colors
            const r = isNightMode ? 100 : 20;
            const g = isNightMode ? 200 : 38;
            const b = isNightMode ? 255 : 65;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * blockSize;
                    const y = j * blockSize;

                    const dist = Math.hypot(mx - (x + blockSize / 2), my - (y + blockSize / 2));
                    const radius = 400; // Large flashlight

                    if (dist < radius) {
                        const alpha = Math.pow(1 - dist / radius, 3) * 0.3; // Cubic falloff, max 0.3 opacity
                        if (alpha > 0.01) {
                            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                            ctx.fillRect(x + gap / 2, y + gap / 2, blockSize - gap, blockSize - gap);
                        }
                    } else {
                        // Draw extremely faint grid everywhere
                        ctx.fillStyle = isNightMode
                            ? `rgba(255, 255, 255, 0.02)`
                            : `rgba(0, 0, 0, 0.04)`;

                        ctx.fillRect(x + gap / 2, y + gap / 2, blockSize - gap, blockSize - gap);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isNightMode]);

    return <canvas ref={canvasRef} className={styles.pixelCanvas} />;
};

export default PixelBackground;
