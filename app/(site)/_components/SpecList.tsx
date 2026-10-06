import styles from './SpecList.module.css';

type SpecListProps = {
    rows: { key: string; value: React.ReactNode }[];
    /** The hero spec sits in a box; the closing roadmap reuses the shape without it */
    boxed?: boolean;
    size?: 'list' | 'small' | 'body';
};

export default function SpecList({ rows, boxed, size = 'list' }: SpecListProps) {
    return (
        <dl className={`${styles.spec} ${boxed ? styles.boxed : ''} ${styles[size]}`}>
            {rows.map(row => (
                <div key={row.key} className={styles.row}>
                    <dt className={`${styles.key} mono`}>{row.key}</dt>
                    <dd className={styles.value}>{row.value}</dd>
                </div>
            ))}
        </dl>
    );
}
