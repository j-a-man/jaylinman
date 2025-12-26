'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './PixelBackground.module.css';

const PixelBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [isNightMode, setIsNightMode] = useState(false);

    useEffect(() => {
        // Check for night mode on mount and listen for changes if possible
        // Ideally we check the body class.
        const checkNightMode = () => {
            if (document.body.classList.contains('night-mode')) {
                setIsNightMode(true);
            } else {
                setIsNightMode(false);
            }
        };

        checkNightMode();

        // Observer for body class changes to switch theme dynamically
        const observer = new MutationObserver(checkNightMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let resizeTimeout: NodeJS.Timeout;

        const blockSize = 40; // Size of each pixel block
        const gap = 2; // Gap between blocks

        // Core drawing function
        const draw = () => {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / blockSize);
            const rows = Math.ceil(canvas.height / blockSize);

            // Determine colors based on night mode
            // Night Mode: Dark background, glowing white/cyan pixels
            // Light Mode: Light background, glowing dark/blue pixels? 
            // The user wanted "futuristic glowing pixels". Usually lighter on dark.
            // Let's assume we draw highlights.
            const baseColor = isNightMode ? '255, 255, 255' : '20, 38, 65';

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * blockSize;
                    const y = j * blockSize;

                    // Calculate distance from mouse
                    // Center of block
                    const cx = x + blockSize / 2;
                    const cy = y + blockSize / 2;

                    const dx = mousePos.x - cx;
                    const dy = mousePos.y - cy;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Flashlight radius
                    const radius = 300;

                    if (distance < radius) {
                        // Opacity based on distance (closer = more opaque)
                        const opacity = 1 - (distance / radius);
                        // Ease the opacity for smoother falloff
                        const easedOpacity = opacity * opacity * opacity;

                        // Draw block
                        // We deduct gap to make them look like separate pixels
                        ctx.fillStyle = `rgba(${baseColor}, ${easedOpacity * 0.15})`;
                        ctx.fillRect(x + gap, y + gap, blockSize - gap * 2, blockSize - gap * 2);
                    }
                }
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw();
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        // Draw loop (active only when mouse moves? or continuous for smoothness?)
        // Continuous allows for potential pulsing effects later, but mouse move drive is efficient.
        // Let's do animation frame to ensure it syncs with React state updates if any, but draw() relies on ref values mostly?
        // Actually draw relies on `mousePos` state which triggers this effect.
        // Better to use ref for mouse pos to avoid re-triggering effect constantly?
        // Re-writing to use ref for mouse position for performance.

        handleResize(); // Init size

        // We need a loop if we want smooth updates without React renders
    }, [isNightMode, mousePos]); // Re-bind if theme or mouse changes? 
    // Wait, updating state on mouse move triggers re-render of component?
    // That's slow. Use refs for mouse position.

    return (
        <CanvasCanvas isNightMode={isNightMode} />
    );
};

// Extracted inner component to handle the non-React-state animation loop
const CanvasCanvas = ({ isNightMode }: { isNightMode: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const blockSize = 50;
        const gap = 4; // Distinct pixel gap

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear
            // Note: If we want the "pixels" to be visible even without hover (very faint), we can draw them with low opacity.
            // User asked for "glow based on where my mouse is".
            // Let's draw mostly empty, but highlight near mouse.

            const cols = Math.ceil(canvas.width / blockSize);
            const rows = Math.ceil(canvas.height / blockSize);

            // Optimization: Only compute range around mouse?
            // Brute force is fine for typical screen resolutions (1920x1080 / 50 = ~800 rects). Very cheap.

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Theme colors
            // Night: Glowing Cyan/White? Or just white? 
            // "Modern futuristic". Cyan is safe.
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
                        // Draw extremely faint grid everywhere? 
                        // Maybe not, cleaner if it's just the flashlight.
                        if (isNightMode) {
                            ctx.fillStyle = `rgba(255, 255, 255, 0.02)`; // Very faint guide
                            ctx.fillRect(x + gap / 2, y + gap / 2, blockSize - gap, blockSize - gap);
                        }
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
