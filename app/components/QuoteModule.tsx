import styles from './QuoteModule.module.css';
import React from 'react';

interface QuoteModuleProps {
    children: React.ReactNode;
    attribution: string;
}

const QuoteModule: React.FC<QuoteModuleProps> = ({ children, attribution }) => {
    return (
        <section
            className={`${styles['module-quote']} reveal parallax-vertical-mm-bt`}
            data-from="0%"
            data-to="10%"
            data-timing="quadOut"
        >
            <blockquote>
                <span className={styles['quote-left']}>&ldquo;</span>
                {children}
            </blockquote>
            <span className={styles['attribution']}>{attribution}</span>
        </section>
    );
};

export default QuoteModule;
