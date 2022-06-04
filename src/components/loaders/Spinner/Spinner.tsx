import React from 'react';
import styles from './Spinner.module.scss';
import classNames from "classnames";

interface ISpinnerProps {
    className?: string;
}

export const Spinner: React.FC<ISpinnerProps> = ({ className }) => (
    <div className={classNames(styles.roller, className)}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
    </div>
);