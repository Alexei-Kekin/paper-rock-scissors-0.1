import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {IFigures, IGamePhases, IPlayers} from "../../types";
import { useAssignFigureToPlayer } from "../../../../hooks/useAssignFigureToPlayer";
import styles from './RoundScreen.module.scss';

interface IRoundScreenProps {
    gamePhase: IGamePhases;
    chosenFigures: Dispatch<SetStateAction<any>>;
}

export const RoundScreen: React.FC<IRoundScreenProps> = ({ gamePhase, chosenFigures }) => {
    const [visibleSeparator, setVisibleSeparator] = useState(false);

    const { firstPlayerFigure, secondPlayerFigure } = useAssignFigureToPlayer();

    const renderFirstPlayer = useCallback((className: string) => {
        return (
            <div className={className}>
                Chose figure for { IPlayers.firstPlayer }
                <div style={{ marginTop: '20px' }}>Q paper</div>
                <div>W scissors</div>
                <div>E rock</div>
            </div>
        )
    }, []);

    const renderSecondPlayer = useCallback((className: string) => {
        return (
            <div className={className}>
               Chose figure for { IPlayers.secondPlayer }
                <div style={{ marginTop: '20px' }}>Numpad1 paper</div>
                <div>Numpad2 scissors</div>
                <div>Numpad3 rock</div>
            </div>
        )
    }, []);

    useEffect(() => {
        setVisibleSeparator(gamePhase === IGamePhases.startRound)
    }, [gamePhase]);

    useEffect(() => {
        chosenFigures({firstPlayerFigure, secondPlayerFigure})
    }, [firstPlayerFigure, secondPlayerFigure]);

    return (
        <div className={styles.roundScreen} id="roundScreen">
            <div className={classNames(styles.separator, visibleSeparator && styles.visible)} />
            { renderFirstPlayer(styles.player) }
            { renderSecondPlayer(styles.player) }
        </div>
    );
};