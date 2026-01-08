'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './cs-projects.module.css';
import { PROJECTS } from './data';

// Link Types
type LinkType = 'github' | 'demo' | 'devpost' | 'youtube';

// Helper to get Icon
const getIcon = (type: string) => {
    switch (type) {
        case 'github':
            return (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            );
        case 'youtube':
            return (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            );
        case 'devpost':
            return (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.632h7.55s.968-.087 1.446.605c.456.634.456 2.392.456 2.392v4.868s0 1.956-.51 2.502c-.524.524-1.392.524-1.392.524h-7.55V6.242h.001zm2.345 2.65v5.856h3.402c.496 0 .807-.058 1.031-.303.325-.337.334-1.63.334-1.63V9.663s.06-2.029-1.365-2.03h-3.402z" />
                </svg>
            );
        case 'demo':
        default:
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            );
    }
}

const FILTERS = ['All', 'Web Dev', 'Apps', 'Cyber'];

export default function CSProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    // Get Filtered Projects
    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeFilter);

    // Get Visible Projects based on view count
    const visibleProjects = filteredProjects.slice(0, visibleCount);

    // Reset visibility when filter changes
    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setVisibleCount(6); // Reset to 6 when filter changes
            setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [activeFilter]);

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 6); // Show 6 more (or all)
    };

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
                        web development, and application development.
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
                            {/* Main Card Click Overlay */}
                            <Link href={`/cs-projects/${project.slug}`} className={styles.cardOverlayLink}>
                                <span className="sr-only">View Project</span>
                            </Link>

                            <div className={styles.cardImage}>
                                {/* Custom Links Overlay */}
                                <div className={styles.cardLinks}>
                                    {project.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            className={styles.linkBtn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()} // Prevent card click propagation
                                            title={link.label} // Tooltip
                                        >
                                            {getIcon(link.type)}
                                        </a>
                                    ))}
                                </div>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {project.status === 'In Progress' && (
                                    <div className={styles.statusBadge}>
                                        <div className={styles.statusDot}></div>
                                        <span className={styles.statusText}>In Progress</span>
                                    </div>
                                )}
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

                {/* Show More Button */}
                {visibleCount < filteredProjects.length && (
                    <button className={styles.showMoreBtn} onClick={handleShowMore}>
                        Show More
                    </button>
                )}
            </div>
        </div>
    );
}
