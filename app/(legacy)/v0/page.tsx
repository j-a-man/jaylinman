import Link from 'next/link';
import EmailSidebar from '../_components/EmailSidebar';
import styles from './Home.module.css';

const LINKS = [
    { href: '/v0/about', lines: ['About'] },
    { href: '/v0/cs-projects', lines: ['CS', 'Projects'] },
    { href: '/v0/resume', lines: ['Resume/', 'CV'] },
    { href: '/v0/graphics', lines: ['Graphics', 'Portfolio'] },
    { href: '/v0/contact', lines: ['Contact'] },
];

export default function HomePage() {
    return (
        <main className={styles.home}>
            <EmailSidebar />
            <nav aria-label="Sections" className={styles.stage}>
                <ol className={styles.list}>
                    {LINKS.map((link, i) => (
                        <li key={link.href} className={styles.item}>
                            <Link href={link.href} className={styles.link}>
                                {link.lines.map((line, j) => (
                                    <span
                                        key={line}
                                        className="v0-rise"
                                        style={{ '--v0-delay': `${0.12 + i * 0.07 + j * 0.05}s` } as React.CSSProperties}
                                    >
                                        <span>{line}</span>
                                    </span>
                                ))}
                            </Link>
                        </li>
                    ))}
                </ol>
            </nav>
        </main>
    );
}
