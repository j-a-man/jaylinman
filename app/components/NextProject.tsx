import React from 'react';
import styles from './NextProject.module.css';
import Link from 'next/link';

interface NextProjectProps {
    href: string;
    name: React.ReactNode;
}

const NextProject: React.FC<NextProjectProps> = ({ href, name }) => {
    return (
        <section
            className={`${styles['module-project']} reveal parallax-vertical-tb-bt parallax-no-mobile`}
            data-from="25%"
            data-to="0%"
            data-timing="quadOut"
        >
            <Link href={href}>
                <h2 className={styles['next-project']}>next project</h2>
                <span className={styles['project-name']}>{name}</span>
            </Link>
        </section>
    );
};

export default NextProject;
