import React from 'react';
import { IChosenFigures } from "../../types";
import classNames from "classnames";
import styles from './BetweenRoundsScreen.module.scss';

interface IBetweenRoundsScreen {
  figures: IChosenFigures,
}

export const BetweenRoundsScreen: React.FC<IBetweenRoundsScreen> = ({ figures }) => {

  return (
    <div className={styles.betweenRoundsScreen}>
      <div className={styles.figuresInteraction}>
        <div
          className={classNames(
            styles.figureIcon,
            styles.mirrored,
            // { [styles.scissors]:  }
          )}
        />

      </div>
    </div>
  )
}