'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './Contact.module.css';

export default function ContactPage() {
    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    return (
        <div className="barba-wrapper">
            <Link className="btn-page-back" href="/" style={{ display: 'block', opacity: 1, pointerEvents: 'auto', transform: 'none', right: '8%', top: '35px' }}>
                <span className="btn-box">
                    <span className="icon-back"></span>
                </span>
            </Link>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Contact Me</h1>
                    <p className={styles.subtitle}>
                        Have a project in mind or want to say hello? I'd love to hear from you.
                    </p>
                </div>

                <div className={styles.contentWrapper}>
                    {/* Social/Info Section */}
                    <div className={styles.infoSection}>
                        <div className={styles.socialGrid}>
                            <a href="mailto:jman@binghamton.edu" className={styles.socialCard}>
                                <div className={styles.icon}>✉️</div>
                                <div className={styles.socialText}>
                                    <h3>Email</h3>
                                    <p>jman@binghamton.edu</p>
                                </div>
                            </a>
                            <a href="https://linkedin.com/in/jaylin-man" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                                <div className={styles.icon}>💼</div>
                                <div className={styles.socialText}>
                                    <h3>LinkedIn</h3>
                                    <p>linkedin.com/in/jaylin-man</p>
                                </div>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                                <div className={styles.icon}>📸</div>
                                <div className={styles.socialText}>
                                    <h3>Instagram</h3>
                                    <p>@j_man_visuals</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Name</label>
                                <input type="text" className={styles.input} placeholder="Your Name" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email</label>
                                <input type="email" className={styles.input} placeholder="your@email.com" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message</label>
                                <textarea className={styles.textarea} placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn}>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
