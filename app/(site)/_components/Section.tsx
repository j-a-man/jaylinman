import styles from './Section.module.css';

type SectionProps = {
    id: string;
    kicker: string;
    title: string;
    subtitle?: string;
    last?: boolean;
    children: React.ReactNode;
};

// Plain-English heading; the git and product vocabulary lives only in the small kicker
export default function Section({ id, kicker, title, subtitle, last, children }: SectionProps) {
    return (
        <section id={id} className={`container ${styles.section} ${last ? styles.last : ''}`} aria-labelledby={`${id}-title`}>
            <p className={`${styles.kicker} mono`}>{kicker}</p>
            <h2 id={`${id}-title`} className={styles.title}>
                {title}
            </h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <div className={styles.body}>{children}</div>
        </section>
    );
}
