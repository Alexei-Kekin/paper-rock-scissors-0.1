import React from 'react';
import { IPlayers, IResultEvents, IScores } from "../../types";
import styles from './SessionResultScreen.module.scss'

interface ISessionResultScreen {
  scores: IScores;
}

export const SessionResultScreen: React.FC<ISessionResultScreen> = ({ scores: { firstPlayerScore, secondPlayerScore
} }) => {
  const outputResult =
    firstPlayerScore === secondPlayerScore
      ? IResultEvents.draw
      : firstPlayerScore > secondPlayerScore
        ? IPlayers.firstPlayer + IResultEvents.win
        : IPlayers.secondPlayer + IResultEvents.win

  return (
    <div className={styles.sessionResultScreen}>
      <div className={styles.descriptionTitle}>
        <div className={styles.textHolder}>Result of today's battle...</div>
      </div>
      <div className={styles.values}>
        <div className={styles.textHolder}>
          { outputResult }
          <span>{` score: (${firstPlayerScore}/${secondPlayerScore})`}</span>
        </div>
      </div>
      <div className={styles.icon} />
    </div>
  )
};


