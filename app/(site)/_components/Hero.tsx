import { hero, person } from '../_content';
import { version } from '../version';
import Arrow from './Arrow';
import RichText from './RichText';
import SpecList from './SpecList';
import styles from './Hero.module.css';

// The build month, so the kicker never goes stale
const releasedMonth = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'America/New_York' })
    .format(new Date())
    .toLowerCase();

export default function Hero() {
    return (
        <section id="about" className={`container ${styles.hero}`} aria-labelledby="about-title">
            <p className={`${styles.kicker} mono`}>
                {version} · {releasedMonth} · v0 deprecated, not deleted
            </p>
            <h1 id="about-title" className={styles.name}>
                {person.name}
            </h1>
            <p className={styles.lead}>
                {hero.leadBefore}
                <em className={styles.serif}>{hero.leadSerif}</em>
                {hero.leadAfter}
            </p>

            <SpecList boxed rows={hero.spec.map(row => ({ key: row.key, value: <RichText value={row.value} /> }))} />

            <ul className={styles.links}>
                <li>
                    <a href={person.resume} target="_blank" rel="noopener noreferrer">
                        resume (pdf)
                        <span className="sr-only"> (opens in new tab)</span>
                    </a>
                </li>
                <li>
                    <a href={person.github} target="_blank" rel="noopener noreferrer">
                        github<Arrow direction="up-right" trailing />
                        <span className="sr-only"> (opens in new tab)</span>
                    </a>
                </li>
                <li>
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                        linkedin<Arrow direction="up-right" trailing />
                        <span className="sr-only"> (opens in new tab)</span>
                    </a>
                </li>
                <li>
                    <a href={`mailto:${person.email}`}>email</a>
                </li>
            </ul>
        </section>
    );
}
