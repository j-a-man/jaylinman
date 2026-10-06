import { Fragment } from 'react';
import { person, projects } from '../_content';
import Arrow from './Arrow';
import Glyph from './Glyph';
import { REPO_HINT } from './LinkHints';
import { Chip } from './RichText';
import Section from './Section';
import Tags from './Tags';
import styles from './Projects.module.css';

// "→ first" stays together so a line can never end on an arrow; the rest of a step may wrap on tiny screens
function PipelineStep({ step, first }: { step: string; first: boolean }) {
    const [lead, ...rest] = step.split(' ');
    return (
        <span className={styles.step}>
            <span className={styles.lead}>
                {!first && (
                    <>
                        <Arrow />
                        <span className="sr-only">, then </span>
                    </>
                )}
                {lead}
            </span>
            {rest.length > 0 && ` ${rest.join(' ')}`}
        </span>
    );
}

export default function Projects() {
    return (
        <Section id="projects" kicker="repos" title="Projects" subtitle="Tools I built because I needed them. The public ones link to their code.">
            <ul className={styles.list}>
                {projects.map(project => (
                    <li key={project.name} className={styles.project}>
                        <Glyph name={project.glyph} />
                        <article className={styles.content}>
                            <div className={styles.nameRow}>
                                <h3 className={styles.heading}>
                                    {project.repoReady ? (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.name}
                                            aria-describedby={REPO_HINT}
                                        >
                                            {project.name}
                                            <span className={styles.nameArrow}>
                                                <Arrow direction="up-right" />
                                            </span>
                                        </a>
                                    ) : (
                                        <span className={styles.name}>{project.name}</span>
                                    )}
                                </h3>
                                <span className={`${styles.status} mono`}>{project.status}</span>
                            </div>
                            <p className={styles.pitch}>{project.pitch}</p>
                            <p className={`${styles.pipeline} mono`}>
                                {project.pipeline.map((step, i) => (
                                    <Fragment key={step}>
                                        {i > 0 && ' '}
                                        <PipelineStep step={step} first={i === 0} />
                                    </Fragment>
                                ))}
                            </p>
                            <p className={styles.decision}>{project.decision}</p>
                            {project.metric && (
                                <p className={styles.metric}>
                                    <Chip segment={project.metric.value} />
                                    <span className={`${styles.note} mono`}>{project.metric.note}</span>
                                </p>
                            )}
                            <Tags tags={project.tags} className={styles.tags} />
                            {!project.repoReady && (
                                <p className={`${styles.private} mono`}>
                                    code private for now ·{' '}
                                    <a href={`mailto:${person.email}?subject=${encodeURIComponent(`walkthrough: ${project.name}`)}`}>
                                        walkthrough on request
                                    </a>
                                </p>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
