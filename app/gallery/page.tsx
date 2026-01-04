'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GalleryPage() {
    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    return (
        <div id="barba-wrapper">
            <div className="barba-container" data-namespace="work-page">
                <div className="barba-transition-container">
                    <section className="case-study basicScroll">
                        <Link className="btn-page-back" href="/">
                            <span className="btn-box">
                                <span className="icon-back"></span>
                            </span>
                        </Link>
                        <div className="container" style={{ paddingTop: '15vh' }}>
                            <div className="content animate-content">
                                <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Gallery</h1>
                                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                                    A collection of moments and visuals.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
