import React from 'react';
import styles from './EmailSidebar.module.css';

const EmailSidebar = () => {
    return (
        <div className={styles.emailSidebar}>
            <a href="mailto:jaylinman4@gmail.com" className={styles.emailLink}>
                jaylinman4@gmail.com
            </a>
            <div className={styles.line}></div>
        </div>
    );
};

export default EmailSidebar;
