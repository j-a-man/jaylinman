'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

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
                            <a href="mailto:jaylinman4@gmail.com" className={styles.socialCard}>
                                <div className={styles.icon}>✉️</div>
                                <div className={styles.socialText}>
                                    <h3>Email</h3>
                                    <p>jaylinman4@gmail.com</p>
                                </div>
                            </a>
                            <a href="https://linkedin.com/in/jaylinman" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                                <div className={styles.icon}>💼</div>
                                <div className={styles.socialText}>
                                    <h3>LinkedIn</h3>
                                    <p>linkedin.com/in/jaylinman</p>
                                </div>
                            </a>
                            <a href="https://instagram.com/jaylin__man" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                                <div className={styles.icon}>📸</div>
                                <div className={styles.socialText}>
                                    <h3>Instagram</h3>
                                    <p>@jaylin__man</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className={styles.input}
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="your@email.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message</label>
                                <textarea
                                    name="message"
                                    className={styles.textarea}
                                    placeholder="Tell me about your project..."
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {status === 'success' && (
                                <p style={{ color: '#4ade80', marginBottom: '1rem' }}>Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p style={{ color: '#ef4444', marginBottom: '1rem' }}>Something went wrong. Please try again.</p>
                            )}

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={status === 'loading'}
                                style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
