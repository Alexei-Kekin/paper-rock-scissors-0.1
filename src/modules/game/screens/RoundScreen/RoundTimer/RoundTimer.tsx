import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import styles from './RoundTimer.module.scss';

interface IRoundTimerProps {
    roundTimerDuration: number;
    className?: string;
}

export const RoundTimer: React.FC<IRoundTimerProps> = ({ roundTimerDuration, className }) => {
    const TIMELINE_ITEMS_COUNT = 15;
    const TIME_STEP_DURATION = roundTimerDuration / TIMELINE_ITEMS_COUNT;

    const [completedStepsCount, setCompletedStepsCount] = useState(TIMELINE_ITEMS_COUNT);

    useEffect(() => {
      const interval = setInterval(() => {
          setCompletedStepsCount(completedStepsCount - 1)
      }, TIME_STEP_DURATION)
        
        return () => clearInterval(interval);
    }, [completedStepsCount]);

    return (
        <div className={classNames(styles.roundTimer, className)}>
            <div className={styles.timeline}>
                {
                    Array(TIMELINE_ITEMS_COUNT)
                        .fill('_')
                        .map((_, index) => {
                            return (
                                <img
                                    key={index + Date.now()}
                                    className={classNames(
                                        styles.img,
                                        { [styles.hidden]: completedStepsCount <= index }
                                    )}
                                     src={require('../../../../../assets/images/lightningGif.gif')}
                                     alt="gif"
                                />
                            )
                        })
                }
            </div>
        </div>
    );
};