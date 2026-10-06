import { version } from '../version';
import Arrow from './Arrow';
import styles from './Footer.module.css';

const build = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'dev';
const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className={`container ${styles.footer}`}>
            <div className={`${styles.stamp} mono`}>
                <p>
                    {version} · build {build} · © {year} Jaylin Man
                </p>
                <p>set in Instrument Sans, Geist Mono and Newsreader · colors from Rosé Pine</p>
            </div>
            <a href="#top" className={styles.top} data-print="hide">
                back to top<Arrow direction="up" trailing />
            </a>
        </footer>
    );
}
