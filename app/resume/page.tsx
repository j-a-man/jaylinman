'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './Resume.module.css';

export default function ResumePage() {
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
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Jaylin Man</h1>
                        <p className={styles.contactInfo}>
                            Roslyn, NY | (347) 322 - 4358 | jman@binghamton.edu
                            <br />
                            linkedin.com/in/jaylin-man | github.com/j-a-man
                        </p>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                            Download PDF
                        </a>
                    </div>

                    {/* ROW 1: Education & Skills */}
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <h2 className={styles.subHeader}>Education</h2>
                            <div className={styles.card}>
                                <h3 className={styles.jobRole} style={{ fontSize: '1.2rem' }}>Binghamton University</h3>
                                <p className={styles.company}>State University of New York</p>
                                <p className={styles.description}>
                                    <strong>Bachelor of Science in Computer Science</strong><br />
                                    Expected May 2028<br />
                                    Cumulative GPA: 3.68/4.00<br />
                                    Dean’s List: Fall 2024 – Fall 2025
                                </p>
                                <p className={styles.description} style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                                    <em>Relevant Coursework:</em> Algorithms & Data Structures, Programming with Objects and Data, Discrete Mathematics
                                </p>
                            </div>
                        </div>
                        <div className={styles.col}>
                            <h2 className={styles.subHeader}>Technical Skills</h2>
                            <div className={styles.card}>
                                <p className={styles.description} style={{ marginBottom: '15px' }}>
                                    <strong>Languages:</strong><br />
                                    <span className={styles.tag}>Python</span>
                                    <span className={styles.tag}>Java</span>
                                    <span className={styles.tag}>C</span>
                                    <span className={styles.tag}>C++</span>
                                    <span className={styles.tag}>JavaScript</span>
                                    <span className={styles.tag}>HTML</span>
                                    <span className={styles.tag}>CSS</span>
                                    <span className={styles.tag}>R</span>
                                </p>
                                <p className={styles.description} style={{ marginBottom: '15px' }}>
                                    <strong>Dev Tools:</strong><br />
                                    <span className={styles.tag}>Git</span>
                                    <span className={styles.tag}>Vim</span>
                                    <span className={styles.tag}>VSCode</span>
                                    <span className={styles.tag}>Splunk</span>
                                    <span className={styles.tag}>Wireshark</span>
                                    <span className={styles.tag}>RStudio</span>
                                </p>
                                <p className={styles.description}>
                                    <strong>Certifications:</strong> CodePath WEB101, CodePath CYB102, National Student Data Corps Data Science Projects Certificate
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PROFESSIONAL EXPERIENCE */}
                    <h2 className={styles.sectionTitle}>Professional Experience</h2>
                    <div className={styles.timeline}>
                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Software Engineer Intern</h3>
                                        <span className={styles.date}>August 2025 - Present</span>
                                    </div>
                                    <span className={styles.company}>Health Guard Pharmacy | Queens, NY</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Spearheaded the design and development of the pharmacy's official website using CSS, HTML, Java, delivering a complete digital platform for customer engagement.</li>
                                        <li>Engineered a mobile-first, responsive design that seamlessly scales across 5 major device breakpoints, ensuring optimal performance for all users.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROJECT EXPERIENCE */}
                    <h2 className={styles.sectionTitle}>Project Experience</h2>
                    <div className={styles.timeline}>
                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Pharmacy Payroll Management Application</h3>
                                        <span className={styles.date}>November 2025 - Present</span>
                                    </div>
                                    <span className={styles.company}>Sole Developer | Node.js, React.js, Firebase, Vercel</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Developing a full-stack payroll application to automate bi-weekly employee pay and track employee clock in/clock out records.</li>
                                        <li>Engineering a secure role-based authentication system to manage administrative access and employee portals, ensuring data privacy and compliance.</li>
                                        <li>Streamlining the payroll workflow by replacing manual spreadsheets with a centralized dashboard, reducing processing time and improved accuracy.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Stackhacks Phishing Detection Tool</h3>
                                        <span className={styles.date}>October 2025 - Present</span>
                                    </div>
                                    <span className={styles.company}>Project Supervisor | LLM, Javascript, Chrome Extension API</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Supervised a project team in the development of an anti-phishing Chrome extension designed for campus-wide student email protection.</li>
                                        <li>Designed the system architecture to leverage a Large Language Model to analyze email content and provide students with a real-time phishing likelihood percentage.</li>
                                        <li>Drove the project from ideation through technical design and planning for deployment to the university community.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Faceable</h3>
                                        <span className={styles.date}>October 2025</span>
                                    </div>
                                    <span className={styles.company}>Front End Developer | HackHarvard Project</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Created an accessibility-focused face-tracking platform that uses facial gestures to change tools and create art for individuals with limited mobility.</li>
                                        <li>Developed the front-end user experience using React and Tailwind CSS and utilized Google AI’s Mediapipe Face Landmarker for precise, real-time face tracking.</li>
                                        <li>Launched platform to the web and secured validation from 15 industry judges at a major hackathon.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Northeast Big Data Transportation</h3>
                                        <span className={styles.date}>Jan 2025 - Feb 2025</span>
                                    </div>
                                    <span className={styles.company}>Data Analyst | Python, Pandas, Matplotlib</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Developed severity heatmaps, bar charts, and line graphs using Python, Pandas, Matplotlib and Seaborn.</li>
                                        <li>Analyzed a 2.2 million-row NYC OpenData dataset, developing severity heatmaps to investigate traffic safety trends.</li>
                                        <li>Formulated and presented a research statement to focusing on speed cameras and their ineffectiveness in reducing collisions.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LEADERSHIP EXPERIENCE */}
                    <h2 className={styles.sectionTitle}>Leadership Experience</h2>
                    <div className={styles.timeline}>
                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>CodePath</h3>
                                        <span className={styles.date}>May 2025 - Present</span>
                                    </div>
                                    <span className={styles.company}>Peer Mentor</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Supported 5 CodePath students through regular check-ins, coursework guidance, and identifying support needs.</li>
                                        <li>Promoted a positive learning environment by tracking progress and connecting peers to resources.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Binghamton Stackhacks</h3>
                                        <span className={styles.date}>March 2025 - Present</span>
                                    </div>
                                    <span className={styles.company}>Chief Marketing Officer</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Drove a 25% increase in student engagement by designing and deploying high-impact visual content using Canva.</li>
                                        <li>Orchestrated student coding teams from project inception to successful completion.</li>
                                        <li>Streamlined E-Board efforts during bi-weekly meetings, aligning goals across all committees to boost overall club success.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Truetalks Podcast</h3>
                                        <span className={styles.date}>Nov 2019 - Present</span>
                                    </div>
                                    <span className={styles.company}>Founder</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Created over 100+ episodes which included guest interviews with people in technology, business owners, & entrepreneurs.</li>
                                        <li>Secured brand partnerships with Mint Mobile, Pitaka, and Anchor, by executing multi-platform marketing campaigns.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        <p className={styles.hobbies}>
                            <strong>Hobbies:</strong> pickleball, weightlifting, bouldering, piano, spikeball, film, swimming, marketing, content creation
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
