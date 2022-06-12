import React from 'react';
import classNames from "classnames";
import styles from './PlayerComponent.module.scss';

interface IPlayerComponentProps {
    title: string;
    chosePaper: string;
    choseScissors: string;
    choseRock: string;
    className?: string;
}

export const PlayerComponent: React.FC<IPlayerComponentProps> = ({
  title, chosePaper, choseScissors, choseRock, className
}) => {
    return (
        <div className={classNames(styles.player, className)}>
            <div className={styles.title}>{ title }</div>
            <div className={styles.container}>
                <div>{ chosePaper } paper</div>
                <div>{ choseScissors } scissors</div>
                <div>{ choseRock } rock</div>
            </div>
        </div>
    );
};