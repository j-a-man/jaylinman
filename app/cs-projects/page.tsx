'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './cs-projects.module.css';

// Dummy Data
const PROJECTS = [
    {
        id: 1,
        title: 'Portfolio V2',
        category: 'Web Dev',
        description: 'A modern, interactive portfolio built with Next.js, featuring scroll-driven animations and a custom design system.',
        image: '/project1.jpg', // Placeholder
        link: '#'
    },
    {
        id: 2,
        title: 'Task Master App',
        category: 'Apps',
        description: 'A React Native productivity app helping users organize daily tasks with smart reminders and cloud sync.',
        image: '/project2.jpg',
        link: '#'
    },
    {
        id: 3,
        title: 'AlgoVisualizer',
        category: 'Web Dev',
        description: 'An interactive sorting algorithm visualizer. Watch bubble sort, merge sort, and quick sort in action.',
        image: '/project3.jpg',
        link: '#'
    },
    {
        id: 4,
        title: 'Crypto Tracker',
        category: 'Web Dev',
        description: 'Real-time cryptocurrency dashboard using CoinGecko API. Tracks prices, volume, and market cap changes.',
        image: '/project4.jpg',
        link: '#'
    },
    {
        id: 5,
        title: 'EcoScan',
        category: 'Apps',
        description: 'Mobile app that scans product barcodes to reveal their carbon footprint and sustainability score.',
        image: '/project5.jpg',
        link: '#'
    },
    {
        id: 6,
        title: 'Data Structure Lib',
        category: 'Other',
        description: 'A comprehensive C++ library implementing advanced data structures like Red-Black Trees and Graphs.',
        image: '/project6.jpg',
        link: '#'
    }
];

const FILTERS = ['All', 'Web Dev', 'Apps', 'Other'];

export default function CSProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [visibleProjects, setVisibleProjects] = useState(PROJECTS);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            if (activeFilter === 'All') {
                setVisibleProjects(PROJECTS);
            } else {
                setVisibleProjects(PROJECTS.filter(p => p.category === activeFilter));
            }
            setIsAnimating(false);
        }, 300); // Wait for fade out
        return () => clearTimeout(timer);
    }, [activeFilter]);

    return (
        <div className="barba-wrapper">
            {/* Back Button */}
            <Link className="btn-page-back" href="/" style={{ display: 'block', opacity: 1, pointerEvents: 'auto', transform: 'none', right: '8%', top: '35px' }}>
                <span className="btn-box">
                    <span className="icon-back"></span>
                </span>
            </Link>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>CS Projects</h1>
                    <p className={styles.subtitle}>
                        A curated collection of my work in software engineering,
                        web development, and algorithmic problem solving.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className={styles.filterBar}>
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className={styles.grid} style={{ opacity: isAnimating ? 0 : 1, transition: 'opacity 0.3s ease' }}>
                    {visibleProjects.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                {/* Replace with <Image /> in production */}
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #f3f3f3, #e1e1e1)' }}></div>
                            </div>
                            <div className={styles.cardContent}>
                                <div>
                                    <div className={styles.cardCategory}>{project.category}</div>
                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    <p className={styles.cardDesc}>{project.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
