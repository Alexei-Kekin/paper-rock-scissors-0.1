import React from 'react';
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../../../components/Button/Button";
import { resetAppState } from "../../state/reducer";
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

  const dispatch = useDispatch();

  const resetAppStateHandler = () => dispatch(resetAppState());

  const outputResultLayout =
    firstPlayerScore !== secondPlayerScore
      ? <span>
          { firstPlayerScore > secondPlayerScore
            ? IPlayers.firstPlayer
            : IPlayers.secondPlayer
          }
          <span>WINS</span>
        </span>
      : <div>DRAW</div>

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
                { outputResultLayout }
                <span>{` score: (${firstPlayerScore}/${secondPlayerScore})`}</span>
              </div>
            </div>
            <div className={styles.icon} />
            <Button
              className={styles.restartGameButton}
              onClick={resetAppStateHandler}
            >
              Restart game
            </Button>
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  )
};
