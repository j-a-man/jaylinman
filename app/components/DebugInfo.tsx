'use client';
import React, { useEffect, useState } from 'react';

export default function DebugInfo() {
    const [info, setInfo] = useState('');

    useEffect(() => {
        const updateInfo = () => {
            const bodyClass = document.body.className;
            const projectLink = document.querySelector('.projectsLi > div > a');
            const projectSpan = document.querySelector('.projectsLi > div > a > .slideUp > span');

            let computedColor = 'N/A';
            if (projectSpan) {
                computedColor = window.getComputedStyle(projectSpan).color;
            }

            setInfo(`Body Class: [${bodyClass}] | Span Color: ${computedColor}`);
        };

        updateInfo();
        const interval = setInterval(updateInfo, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            background: 'red',
            color: 'white',
            zIndex: 99999,
            padding: '10px',
            fontSize: '12px'
        }}>
            {info}
        </div>
    );
}
