import { roles, skills } from '../_content';
import DateRange from './DateRange';
import GenesisLink from './GenesisLink';
import { NEW_TAB_HINT } from './LinkHints';
import RichText from './RichText';
import Section from './Section';
import SpecList from './SpecList';
import Tags from './Tags';
import styles from './Experience.module.css';

export default function Experience() {
    return (
        <Section
            id="work"
            kicker="changelog"
            title="Experience"
            subtitle="Newest first. Most started by talking to the people doing the work."
        >
            <div className={styles.timeline}>
                <ol className={styles.list}>
                    {roles.map(role => (
                        <li key={`${role.org}-${role.start}`} className={styles.entry}>
                            <span className={styles.node} aria-hidden="true" />
                            <article className={styles.content}>
                                <p className={`${styles.meta} mono`}>
                                    <DateRange start={role.start} end={role.end} /> · {role.location}
                                </p>
                                <h3 className={styles.role}>
                                    <span className={styles.title}>{role.title}</span>
                                    {/* The no-break space keeps "@" with the org name when the heading wraps */}
                                    <span className={styles.at}> @{'\u00A0'}</span>
                                    {role.orgUrl ? (
                                        <a
                                            href={role.orgUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.org}
                                            aria-describedby={NEW_TAB_HINT}
                                        >
                                            {role.org}
                                        </a>
                                    ) : (
                                        <span className={styles.org}>{role.org}</span>
                                    )}
                                </h3>
                                <p className={styles.summary}>
                                    <RichText value={role.summary} />
                                </p>
                                <ul className={styles.bullets}>
                                    {role.bullets.map((bullet, i) => (
                                        <li key={i}>
                                            <span className={`${styles.plus} mono`} aria-hidden="true">
                                                +
                                            </span>
                                            <RichText value={bullet} />
                                        </li>
                                    ))}
                                </ul>
                                <Tags tags={role.tags} className={styles.tags} />
                            </article>
                        </li>
                    ))}
                </ol>
                <div className={styles.genesisRow}>
                    <GenesisLink />
                </div>
            </div>

            <h3 className={styles.skillsTitle}>Skills</h3>
            <SpecList size="small" rows={skills.map(skill => ({ key: skill.key, value: skill.value }))} />
        </Section>
    );
}
