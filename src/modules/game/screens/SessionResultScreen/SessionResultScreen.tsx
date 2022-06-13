import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { IPlayers, IResultEvents, IScores, IScreenVisibility } from "../../types";
import styles from './SessionResultScreen.module.scss'

interface ISessionResultScreen {
  isVisible: IScreenVisibility;
  scores: IScores;
}

export const SessionResultScreen: React.FC<ISessionResultScreen> = ({
  isVisible,
  scores: { firstPlayerScore, secondPlayerScore}
}) => {
  const outputResult =
    firstPlayerScore === secondPlayerScore
      ? IResultEvents.draw
      : firstPlayerScore > secondPlayerScore
        ? IPlayers.firstPlayer + 'WINS'
        : IPlayers.secondPlayer + "WINS"

  return (
    <AnimatePresence>
      { isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.sessionResultScreen}>
            <div className={styles.descriptionTitle}>
              <div className={styles.textHolder}>And the result of today's battle...</div>
            </div>
            <div className={styles.values}>
              <div className={styles.textHolder}>
                { outputResult }
                <span>{` score: (${firstPlayerScore}/${secondPlayerScore})`}</span>
              </div>
            </div>
            <div className={styles.icon} />
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  )
};
