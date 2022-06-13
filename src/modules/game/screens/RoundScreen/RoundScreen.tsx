import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {IPlayers, IScreenVisibility} from "../../types";
import { useAssignFigureToPlayer } from "../../../../hooks/useAssignFigureToPlayer";
import { PlayerComponent } from "./PlayerComponent/PlayerComponent";
import { RoundTimer } from "./RoundTimer/RoundTimer";
import styles from './RoundScreen.module.scss';

interface IRoundScreenProps {
    chosenFigures: Dispatch<SetStateAction<any>>;
    roundTimer: number;
    isVisible: IScreenVisibility;
}

export const RoundScreen: React.FC<IRoundScreenProps> = ({ chosenFigures, roundTimer, isVisible }) => {
    const { firstPlayerFigure, secondPlayerFigure } = useAssignFigureToPlayer();

    useEffect(() => {
        chosenFigures({firstPlayerFigure, secondPlayerFigure})
    }, [firstPlayerFigure, secondPlayerFigure]);

    return (
        <AnimatePresence>
            { isVisible && (
                <motion.div
                    id="roundScreen"
                    className={styles.roundScreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <img className={styles.separator} src={require('../../../../../src/assets/images/separator.png')} alt="Separator" />
                    <PlayerComponent
                        player={IPlayers.firstPlayer}
                        title={`Chose figure for ${IPlayers.firstPlayer}`}
                        chosePaper={'Q'}
                        choseScissors={'W'}
                        choseRock={'E'}
                    />
                    <PlayerComponent
                        player={IPlayers.secondPlayer}
                        title={`Chose figure for ${IPlayers.secondPlayer}`}
                        chosePaper={'Numpad 1'}
                        choseScissors={'Numpad 2'}
                        choseRock={'Numpad 3'}
                    />
                    <RoundTimer
                        className={styles.progress}
                        roundTimerDuration={roundTimer}
                    />
                </motion.div>
            ) }
        </AnimatePresence>
    );
};
