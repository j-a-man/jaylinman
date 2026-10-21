import styles from './About.module.css';

export default function AboutPage() {
    return (
        <div className="v0-page">
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>About</h1>
                <div>
                    <div className={styles.section} style={{ marginTop: 0 }}>
                        <h3 className={styles.sectionTitle}>Overview</h3>
                        <p className={styles.bodyText}>
                            Hi and welcome! I&apos;m Jaylin Man, born in NYC and now living in Long Island, NY. I&apos;m currently a sophomore at SUNY Binghamton, studying Computer Science.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Work & Impact</h3>
                        <p className={styles.bodyText}>
                            I am driven by my will to learn and leave a positive impact on the communities around me. I took part in startups, non-profits, and smaller companies to build products/services that help people.
                        </p>
                        <p className={styles.bodyText}>
                            Currently I&apos;m helping build a website and Payroll Application called Hourglass for Health Guard Pharmacy. At school, I&apos;ve taken on many roles with Graphic Design where I&apos;ve designed different pamphlets, Instagram graphics, and event flyers.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Personal</h3>
                        <p className={styles.bodyText} style={{ marginBottom: '4rem' }}>
                            When I&apos;m not building, I love playing pickleball, making content, and filmmaking. Also love keeping up with the latest technologies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
