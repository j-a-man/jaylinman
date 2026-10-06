import { person, roadmap } from '../_content';
import Arrow from './Arrow';
import CopyEmail from './CopyEmail';
import Section from './Section';
import SpecList from './SpecList';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <Section id="contact" kicker="roadmap" title="What's next" last>
            <SpecList size="body" rows={roadmap.map(row => ({ key: row.key, value: row.value }))} />

            <p className={styles.prompt}>Email is the fastest way to reach me.</p>
            <CopyEmail email={person.email} />

            <ul className={styles.links}>
                <li>
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                        linkedin<Arrow direction="up-right" trailing />
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
                    <a href={person.resume} target="_blank" rel="noopener noreferrer">
                        resume (pdf)
                        <span className="sr-only"> (opens in new tab)</span>
                    </a>
                </li>
            </ul>
        </Section>
    );
}
