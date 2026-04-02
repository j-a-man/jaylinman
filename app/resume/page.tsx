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
                            347-322-4358 | jman@binghamton.edu
                            <br />
                            linkedin.com/in/jaylin-man | github.com/j-a-man | jaylinman.com
                        </p>
                        <a href="/Jaylin_Man_Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
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
                                    Expected May 2027<br />
                                    Cumulative GPA: 3.68/4.00<br />
                                    Dean's List: Fall 2024 – Fall 2025
                                </p>
                                <p className={styles.description} style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                                    <em>Relevant Coursework:</em> Design & Analysis of Algorithms, Programming with Objects and Data Structures
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
                                    <span className={styles.tag}>JavaScript/TypeScript</span>
                                    <span className={styles.tag}>HTML</span>
                                    <span className={styles.tag}>CSS</span>
                                    <span className={styles.tag}>R</span>
                                    <span className={styles.tag}>SQL</span>
                                    <span className={styles.tag}>Rust</span>
                                </p>
                                <p className={styles.description} style={{ marginBottom: '15px' }}>
                                    <strong>Frameworks/Technologies:</strong><br />
                                    <span className={styles.tag}>Next.js</span>
                                    <span className={styles.tag}>React.js</span>
                                    <span className={styles.tag}>Node.js</span>
                                    <span className={styles.tag}>React Native</span>
                                    <span className={styles.tag}>TailwindCSS</span>
                                    <span className={styles.tag}>Flask</span>
                                    <span className={styles.tag}>REST API</span>
                                </p>
                                <p className={styles.description} style={{ marginBottom: '15px' }}>
                                    <strong>Tools:</strong><br />
                                    <span className={styles.tag}>Git</span>
                                    <span className={styles.tag}>Docker</span>
                                    <span className={styles.tag}>Linux</span>
                                    <span className={styles.tag}>Vercel</span>
                                    <span className={styles.tag}>Splunk</span>
                                    <span className={styles.tag}>Wireshark</span>
                                    <span className={styles.tag}>Firebase</span>
                                    <span className={styles.tag}>MongoDB</span>
                                    <span className={styles.tag}>Salesforce</span>
                                    <span className={styles.tag}>Lucidchart</span>
                                </p>
                                <p className={styles.description}>
                                    <strong>Libraries/AI:</strong><br />
                                    <span className={styles.tag}>PyTorch</span>
                                    <span className={styles.tag}>TensorFlow</span>
                                    <span className={styles.tag}>Scikit-Learn</span>
                                    <span className={styles.tag}>Pandas</span>
                                    <span className={styles.tag}>NumPy</span>
                                    <span className={styles.tag}>Jupyter</span>
                                    <span className={styles.tag}>Streamlit</span>
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
                                        <span className={styles.date}>August 2025 – Present</span>
                                    </div>
                                    <span className={styles.company}>Health Guard Pharmacy | Queens, NY</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Architecting solutions for a 30-employee pharmacy, transitioning operations from manual work to digital systems.</li>
                                        <li>Collaborating directly with lead pharmacists to gather requirements from user feedback to iterate on features.</li>
                                        <li>Delivered a payroll automation platform saving 10+ hours of tedious administrative work per month.</li>
                                        <li>Redesigned company website to improve user experience and modernize the pharmacy's digital presence.</li>
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
                                        <h3 className={styles.jobRole}>Pharmacy Payroll Management</h3>
                                        <span className={styles.date}>November 2025 – Present</span>
                                    </div>
                                    <span className={styles.company}>Sole Developer | Node.js, React.js, Firebase, Vercel</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Architected a scalable full-stack application with Firebase Firestore for real-time data synchronization.</li>
                                        <li>Implemented JWT-based authentication with role-based access control for admin and employee permissions.</li>
                                        <li>Designed an automated payroll calculation engine processing bi-weekly timesheets with overtime logic.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Automated Data Quality Dashboard</h3>
                                        <span className={styles.date}>April 2026</span>
                                    </div>
                                    <span className={styles.company}>Solo Developer | Python, Pandas, Streamlit, SciPy</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Built a data quality auditing tool detecting missing values, duplicates, outliers, and type inconsistencies across any CSV dataset.</li>
                                        <li>Engineered 5 modular governance checks with a composite quality scoring system surfacing completeness and integrity KPIs.</li>
                                        <li>Designed an interactive dashboard with color-coded risk flagging to translate raw data issues into actionable governance insights.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>StackHacks Phishing Detection Tool</h3>
                                        <span className={styles.date}>October 2025 – Present</span>
                                    </div>
                                    <span className={styles.company}>Project Supervisor | LLM, JavaScript, Chrome Extension API, Flask</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Managed development of an anti-phishing Chrome extension designed for campus-wide student email protection.</li>
                                        <li>Architected an LLM-powered system to analyze email content and calculate phishing risk scores for students.</li>
                                        <li>Drove the project from ideation through technical design and planning for deployment to the university.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.dot}></div>
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <h3 className={styles.jobRole}>Cisco Webex AI Case Competition</h3>
                                        <span className={styles.date}>February 2026 – March 2026</span>
                                    </div>
                                    <span className={styles.company}>Spyder Consulting | Product Strategy, AI, Financial Modeling</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Won 1st place out of 30+ teams in a Cisco-sponsored competition to reimagine the Webex enterprise platform.</li>
                                        <li>Designed three AI-driven product recommendations: an AI Briefing, a Collaboration Graph surfacing org-wide insights, and Embedded Workflow automation packs.</li>
                                        <li>Grounded each recommendation in market research, technical architecture, and financial modeling to build a full path-to-execution strategy.</li>
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
                                    <span className={styles.company}>Front End Developer | HackHarvard | React, Tailwind CSS, Google AI</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Built a hands-free art platform enabling users with limited mobility to draw using facial gestures.</li>
                                        <li>Engineered a real-time tracking interface using React, TypeScript, and Google MediaPipe for precise cursor control.</li>
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
                                        <h3 className={styles.jobRole}>Northeast Big Data Transportation Project</h3>
                                        <span className={styles.date}>January 2025 – February 2025</span>
                                    </div>
                                    <span className={styles.company}>Data Analyst | Python, Pandas, Matplotlib, Seaborn</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Analyzed a 2.2 million-row NYC OpenData dataset, developing severity heatmaps to investigate traffic safety trends.</li>
                                        <li>Developed severity heatmaps, bar charts, and line graphs using Python, Pandas, Matplotlib, and Seaborn.</li>
                                        <li>Presented a research statement focusing on speed cameras and their ineffectiveness in reducing collisions.</li>
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
                                        <h3 className={styles.jobRole}>Peer Mentor</h3>
                                        <span className={styles.date}>May 2025 – Present</span>
                                    </div>
                                    <span className={styles.company}>CodePath | Remote</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Supported 7 CodePath students through regular check-ins, coursework guidance, and identifying support needs.</li>
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
                                        <h3 className={styles.jobRole}>Chief Marketing Officer</h3>
                                        <span className={styles.date}>March 2025 – Present</span>
                                    </div>
                                    <span className={styles.company}>Binghamton StackHacks | Binghamton, NY</span>
                                    <ul style={{ marginTop: '15px', paddingLeft: '20px', listStyle: 'disc' }} className={styles.description}>
                                        <li>Drove a 25% increase in student engagement by designing and marketing high-impact visual graphics.</li>
                                        <li>Leading marketing strategy for Hack Madness with 50+ participants and $300+ in sponsorships.</li>
                                        <li>Orchestrated student coding team projects from brainstorming to successful completion.</li>
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