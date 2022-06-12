import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { IPlayers } from "../../types";
import { useAssignFigureToPlayer } from "../../../../hooks/useAssignFigureToPlayer";
import { PlayerComponent } from "./PlayerComponent";
import styles from './RoundScreen.module.scss';

interface IRoundScreenProps {
    chosenFigures: Dispatch<SetStateAction<any>>;
    isVisible: boolean;
}

export const RoundScreen: React.FC<IRoundScreenProps> = ({ chosenFigures, isVisible }) => {
    const [visibleSeparator, setVisibleSeparator] = useState(false);

    const { firstPlayerFigure, secondPlayerFigure } = useAssignFigureToPlayer();

    useEffect(() => {
        setVisibleSeparator(isVisible)
    }, [isVisible]);

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
                    <div className={classNames(styles.separator, visibleSeparator && styles.visible)} />
                    <PlayerComponent
                        title={`Chose figure for ${IPlayers.firstPlayer}`}
                        chosePaper={'Q'}
                        choseScissors={'W'}
                        choseRock={'E'}
                    />
                    <PlayerComponent
                        title={`Chose figure for ${IPlayers.secondPlayer}`}
                        chosePaper={'Numpad 1'}
                        choseScissors={'Numpad 2'}
                        choseRock={'Numpad 3'}
                    />
                </motion.div>
            ) }
        </AnimatePresence>
    );
};