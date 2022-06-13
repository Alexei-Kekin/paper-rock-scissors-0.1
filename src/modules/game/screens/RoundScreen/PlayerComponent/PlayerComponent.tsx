import React from 'react';
import classNames from "classnames";
import { IPlayers } from "../../../types";
import styles from './PlayerComponent.module.scss';

interface IPlayerComponentProps {
    player: string;
    title: string;
    chosePaper: string;
    choseScissors: string;
    choseRock: string;
    className?: string;
}

export const PlayerComponent: React.FC<IPlayerComponentProps> = ({
  player,title, chosePaper, choseScissors, choseRock, className
}) => {
    return (
        <div className={classNames(styles.player, className)}>
            <div className={styles.title}>{ title }</div>
            <div className={styles.figures}>
                <div className={styles.paperFigure}>
                    <div className={classNames(styles.paperImg, player === IPlayers.firstPlayer && styles.revertImg)} />
                    <div className={styles.description}>{ chosePaper }</div>
                </div>
                <div className={styles.scissorsFigure}>
                    <div className={classNames(styles.scissorsImg, player === IPlayers.firstPlayer && styles.revertImg)} />
                    <div className={styles.description}>{ choseScissors }</div>
                </div>
                <div className={styles.rockFigure}>
                    <div className={classNames(styles.rockImg, player === IPlayers.firstPlayer && styles.revertImg)} />
                    <div className={styles.description}>{ choseRock }</div>
                </div>
            </div>
        </div>
    );
};