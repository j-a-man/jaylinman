import styles from './Tags.module.css';

// Each tag keeps its words and trailing separator together, so a wrapped line never starts with "·"
export default function Tags({ tags, className = '' }: { tags: string[]; className?: string }) {
    return (
        <p className={`${styles.tags} ${className} mono`}>
            {tags.map((tag, i) => (
                <span key={tag}>
                    <span className={styles.tag}>
                        {tag}
                        {i < tags.length - 1 && ' ·'}
                    </span>
                    {i < tags.length - 1 && ' '}
                </span>
            ))}
        </p>
    );
}
