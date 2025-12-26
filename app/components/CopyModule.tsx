import styles from './CopyModule.module.css';
import React from 'react';

interface CopyModuleProps {
    col1: React.ReactNode;
    col2: React.ReactNode;
    reduceTopPadding?: boolean;
}

const CopyModule: React.FC<CopyModuleProps> = ({ col1, col2, reduceTopPadding }) => {
    return (
        <section className={`${styles['module-copy']} reveal ${reduceTopPadding ? 'theme-reduce-top-padding' : ''}`}>
            <div className={styles['summary']}>
                <div className={styles['col-1']}>{col1}</div>
                <div className={styles['col-2']}>{col2}</div>
            </div>
        </section>
    );
};

export default CopyModule;
