'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Graphics.module.css';
import { graphicsData, GraphicProject } from './data';

type LightboxImage = { src: string; title: string; width: number; height: number };

const FILTERS = ['All', 'Binghamton HKES', 'Binghamton GDG', 'Binghamton Stackhacks', 'Herricks Swim Team'];

export default function GraphicsPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState<GraphicProject | null>(null);
    const [lightboxImg, setLightboxImg] = useState<LightboxImage | null>(null);

    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    const filteredGraphics = activeFilter === 'All'
        ? graphicsData
        : graphicsData.filter(g => g.organization === activeFilter);

    // Handle initial card click
    const handleCardClick = (project: GraphicProject) => {
        if (project.type === 'folder') {
            setSelectedProject(project);
        } else {
            setLightboxImg({ src: project.image, title: project.title, width: project.width || 800, height: project.height || 600 });
        }
    };

    // Handle closing modals
    const closeAll = () => {
        setSelectedProject(null);
        setLightboxImg(null);
    };

    return (
        <div className="barba-wrapper">
            <Link className="btn-page-back" href="/v0" style={{ display: 'block', opacity: 1, pointerEvents: 'auto', transform: 'none', right: '8%', top: '35px', position: 'fixed', zIndex: 20000 }}>
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
                    {filteredGraphics.map((item, index) => (
                        <div key={item.id} className={styles.cardWrapper}>
                            <div className={styles.card} onClick={() => handleCardClick(item)}>
                                {/* sizes mirrors the 3 / 2 / 1 column layout so phones never fetch desktop-sized files */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={item.width || 800}
                                    height={item.height || 600}
                                    sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 30px), min(33vw, 460px)"
                                    loading={index < 3 ? 'eager' : 'lazy'}
                                    className={styles.image}
                                    style={{ width: '100%', height: 'auto' }}
                                    placeholder="empty"
                                />

                                <div className={styles.cardBody}>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <span className={styles.cardOrg}>
                                        {/* Show Folder icon if type is folder */}
                                        {item.type === 'folder' ? '📁 ' : ''}
                                        {item.organization}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FOLDER MODAL */}
            {selectedProject && selectedProject.type === 'folder' && (
                <div className={styles.modalOverlay} onClick={closeAll}>
                    <div className={styles.modalGridContainer} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                            <button className={styles.closeButton} onClick={closeAll}>×</button>
                        </div>
                        <div className={styles.modalGrid}>
                            {selectedProject.items?.map((subItem, idx) => (
                                <div
                                    key={idx}
                                    className={styles.modalItem}
                                    onClick={() => setLightboxImg(subItem)}
                                >
                                    <Image
                                        src={subItem.src}
                                        alt={subItem.title}
                                        width={subItem.width || 800}
                                        height={subItem.height || 600}
                                        sizes="(max-width: 600px) 80vw, 300px"
                                        className={styles.modalImage}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* SINGLE IMAGE LIGHTBOX */}
            {lightboxImg && (
                <div className={styles.modalOverlay} onClick={() => setLightboxImg(null)}>
                    <button className={styles.closeButton} onClick={() => setLightboxImg(null)}>×</button>
                    <div className={styles.modalContent}>
                        {/* Explicit width: srcset candidates would otherwise shrink an auto-sized image. Fits 90vh and never upscales. */}
                        <Image
                            src={lightboxImg.src}
                            alt={lightboxImg.title}
                            width={lightboxImg.width}
                            height={lightboxImg.height}
                            sizes="90vw"
                            className={styles.lightboxImage}
                            style={{
                                width: `min(100%, ${(90 * lightboxImg.width / lightboxImg.height).toFixed(3)}vh, ${lightboxImg.width}px)`,
                                height: 'auto'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
