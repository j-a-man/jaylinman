'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Graphics.module.css';

const GRAPHICS = Array.from({ length: 21 }, (_, i) => {
    const orgs = ['Binghamton Student Association', 'HackHarvard', 'Personal Brand'];
    const org = orgs[i % 3];
    return {
        id: i + 1,
        title: `Graphic Project ${i + 1}`,
        organization: org,
        image: `/graphics/design${i + 1}.jpg`
    };
});

const FILTERS = ['All', 'Binghamton Student Association', 'HackHarvard', 'Personal Brand'];

export default function GraphicsPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    const filteredGraphics = activeFilter === 'All'
        ? GRAPHICS
        : GRAPHICS.filter(g => g.organization === activeFilter);

    return (
        <div className="barba-wrapper">
            <Link className="btn-page-back" href="/" style={{ display: 'block', opacity: 1, pointerEvents: 'auto', transform: 'none', right: '8%', top: '35px' }}>
                <span className="btn-box">
                    <span className="icon-back"></span>
                </span>
            </Link>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Graphics Portfolio</h1>
                    <p className={styles.subtitle}>
                        A collection of visual identity, branding, and marketing materials designed for various organizations.
                    </p>
                </div>

                <div className={styles.tabs}>
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            className={`${styles.tab} ${activeFilter === filter ? styles.activeTab : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filteredGraphics.map((item) => (
                        <div key={item.id} className={styles.cardWrapper}>
                            <div className={styles.card}>
                                {/* Using Inline Style for random height simulation until images are real */}
                                <div className={styles.image} style={{ height: `${200 + (item.id % 5) * 50}px` }}></div>
                                <div className={styles.cardBody}>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <span className={styles.cardOrg}>{item.organization}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
