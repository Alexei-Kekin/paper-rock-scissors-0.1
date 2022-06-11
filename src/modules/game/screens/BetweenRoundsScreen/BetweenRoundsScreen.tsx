import React from 'react';
import { IChosenFigures, IFigures } from "../../types";
import classNames from "classnames";
import styles from './BetweenRoundsScreen.module.scss';

interface IBetweenRoundsScreen {
  figures: IChosenFigures,
  currentRoundWinner: string,
  roundResult: string,
}

export const BetweenRoundsScreen: React.FC<IBetweenRoundsScreen> = ({
  figures,
  currentRoundWinner ,
  roundResult
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
    <div className={styles.betweenRoundsScreen}>
      <div className={styles.figuresInteraction}>
        { roundResult === 'WIN' && Object.values(figures).map((figure, i) => {
          return (
            <div
              key={figure + i}
              className={classNames(
                mapFiguresToClasses[figure],
                styles.figure,
                { [styles.mirrored]: i === 0 },
                { [styles.win]: mapPlayersToIs[currentRoundWinner] === i },
                { [styles.lose]: mapPlayersToIs[currentRoundWinner] !== i }
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
        {/*draw output*/}
        { roundResult === 'DRAW' && <div className={styles.drawIcon} /> }
      </div>
      {/*{Round result text output}*/}
      <div className={styles.resultText}>
        { roundResult !== 'DRAW' && currentRoundWinner }
        <span>{ roundResult === 'WIN' ? 'WINS' : roundResult }</span>
      </div>
    </div>
  )
}
