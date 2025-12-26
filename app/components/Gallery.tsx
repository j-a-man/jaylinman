'use client';

import React, { useState } from 'react';
import styles from './Gallery.module.css';

interface GalleryProps {
    images: string[];
    title: React.ReactNode;
    description: React.ReactNode;
}

const Gallery: React.FC<GalleryProps> = ({ images, title, description }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className={`${styles['module-gallery']} reveal`}>
            <div className={`${styles['gallery']} media`} style={{ position: 'relative', height: '0', paddingBottom: '56.25%', overflow: 'hidden' }}>
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            opacity: index === currentSlide ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                            zIndex: index === currentSlide ? 1 : 0
                        }}
                    />
                ))}
            </div>
            {/* 
      <div className="media gallery">
          <img src={images[currentSlide]} alt="Gallery Slide" style={{width: '100%', display: 'block'}} />
      </div> 
*/}
            <div className={styles['info']}>
                <div className={styles['pagination']}>
                    <button className={styles['btn-gallery-left']} aria-label="Previous" onClick={prevSlide}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="8" viewBox="0 0 19 8">
                            <path d="M1.94974747,3 L19,3 L19,4 L1.70710678,4 L4.24264069,6.53553391 L3.53553391,7.24264069 L-2.22044605e-16,3.62132034 L3.53553391,0 L4.24264069,0.707106781 L1.94974747,3 Z" />
                        </svg>
                    </button>
                    {' '}
                    <span className={styles['current']}>{currentSlide + 1}</span> / <span className={styles['total']}>{images.length}</span>
                    {' '}
                    <button className={styles['btn-gallery-right']} aria-label="Next" onClick={nextSlide}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="8" viewBox="0 0 19 8">
                            <path
                                d="M1.94974747,3 L19,3 L19,4 L1.70710678,4 L4.24264069,6.53553391 L3.53553391,7.24264069 L-2.22044605e-16,3.62132034 L3.53553391,0 L4.24264069,0.707106781 L1.94974747,3 Z"
                                transform="matrix(-1 0 0 1 19 0)"
                            />
                        </svg>
                    </button>
                </div>
                <h6 className={styles['title']}>{title}</h6>
                <div className={styles['description']}>
                    {description}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
