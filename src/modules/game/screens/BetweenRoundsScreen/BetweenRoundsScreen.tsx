import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { IChosenFigures, IFigures, IScores, IScreenVisibility } from "../../types";
import classNames from "classnames";
import styles from './BetweenRoundsScreen.module.scss';

interface IBetweenRoundsScreen {
  isVisible: IScreenVisibility;
  figures: IChosenFigures;
  currentRoundWinner: string;
}

export const BetweenRoundsScreen:React.FC<IBetweenRoundsScreen> = ({
  isVisible,
  figures,
  currentRoundWinner ,
}) => {

  const mapFiguresToClasses: any = {
    [IFigures.rock]: styles.rock,
    [IFigures.scissors]: styles.scissors,
    [IFigures.paper]: styles.paper,
    [IFigures.unselected]: styles.unselected,
  }

  const mapPlayersToIs: {[key: string]: number}  = {
    'First player': 0,
    'Second player': 1,
  };

  return (
    <AnimatePresence>
      { isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.betweenRoundsScreen}>
            <div className={styles.figuresInteraction}>
              { Object.values(figures).map((figure, i) => {
                return (
                  <div
                    key={figure + i}
                    className={classNames(
                      mapFiguresToClasses[figure],
                      styles.figure,
                      { [styles.mirrored]: i === 0 },
                      { [styles.win]: mapPlayersToIs[currentRoundWinner] === i },
                      { [styles.lose]: mapPlayersToIs[currentRoundWinner] !== i },
                      { [styles.draw]: currentRoundWinner === 'DRAW' },
                    )}
                  >
                    <div className={styles.figureIconHolder} />
                    { mapPlayersToIs[currentRoundWinner] === i && (
                      <>
                        <div className={styles.pulsingBordersCreator} />
                        <div className={styles.pulsingBordersCreator2} />
                      </>
                    ) }
                  </div>
                )
              }) }
            </div>
            {/*{Round result text output}*/}
            <div
              className={classNames(
                styles.resultText,
                { [styles.resultTextWhileDraw]: currentRoundWinner === 'DRAW' }
              )}
            >
              { currentRoundWinner !== 'DRAW' && currentRoundWinner }
              <span>{ currentRoundWinner !== 'DRAW' ? 'WINS' : "DRAW" }</span>
            </div>
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  )
}
