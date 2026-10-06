import { education, leadership, offTheClock } from '../_content';
import { monthLabel } from './dates';
import DateRange from './DateRange';
import RichText from './RichText';
import Section from './Section';
import styles from './Beyond.module.css';

export default function Beyond() {
    return (
        <Section id="beyond" kicker="off the main branch" title="Beyond work">
            <ul className={styles.leadership}>
                {leadership.map(item => (
                    <li key={item.org} className={styles.row}>
                        <p className={styles.line}>
                            <span className={styles.role}>
                                <RichText value={item.title} />
                            </span>
                            <span className={styles.org}> · {item.org}</span>
                        </p>
                        {item.start && item.end && (
                            <p className={`${styles.dates} mono`}>
                                <DateRange start={item.start} end={item.end} />
                            </p>
                        )}
                        {item.detail && (
                            <p className={styles.detail}>
                                <RichText value={item.detail} />
                            </p>
                        )}
                    </li>
                ))}
            </ul>

            <h3 className={styles.subTitle}>Education</h3>
            <div className={styles.row}>
                <p className={styles.line}>
                    <span className={styles.role}>{education.degree}</span>
                    <span className={styles.org}> · {education.school}</span>
                </p>
                <p className={`${styles.dates} mono`}>
                    <time dateTime={education.end}>{monthLabel(education.end)}</time>
                </p>
                <p className={`${styles.detail} ${styles.monoDetail} mono`}>{education.detail}</p>
            </div>

            <h3 className={styles.subTitle}>Off the clock</h3>
            <ul className={styles.offClock}>
                {offTheClock.map(line => (
                    <li key={line}>
                        <span className={`${styles.hash} mono`} aria-hidden="true">
                            #
                        </span>
                        {line}
                    </li>
                ))}
            </ul>
        </Section>
    );
}
