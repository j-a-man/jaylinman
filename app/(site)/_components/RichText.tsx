import { Fragment } from 'react';
import type { Rich, Segment } from '../_content';
import Arrow from './Arrow';
import styles from './RichText.module.css';

export function Chip({ segment }: { segment: Exclude<Segment, string> }) {
    if ('diff' in segment) {
        const [from, to] = segment.diff;
        return (
            <span className={styles.diff}>
                <del className={`${styles.chip} ${styles.del} mono`}>
                    <span className="sr-only">from </span>
                    {from}
                </del>
                <span className={styles.arrow}>
                    <Arrow />
                </span>
                <ins className={`${styles.chip} ${styles.ins} mono`}>
                    <span className="sr-only"> to </span>
                    {to}
                </ins>
            </span>
        );
    }
    if ('stat' in segment) {
        return <span className={`${styles.chip} ${styles.ins} mono`}>{segment.stat}</span>;
    }
    return <mark className={styles.mark}>{segment.mark}</mark>;
}

export default function RichText({ value }: { value: Rich }) {
    return (
        <>
            {value.map((segment, i) =>
                typeof segment === 'string' ? <Fragment key={i}>{segment}</Fragment> : <Chip key={i} segment={segment} />
            )}
        </>
    );
}
