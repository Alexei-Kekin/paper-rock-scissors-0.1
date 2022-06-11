import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {IFigures, IGamePhases, IPlayers} from "../../types";
import { useAssignFigureToPlayer } from "../../../../hooks/useAssignFigureToPlayer";
import styles from './RoundScreen.module.scss';

interface IRoundScreenProps {
    gamePhase: IGamePhases;
    chosenFigures: Dispatch<SetStateAction<{  firstFigure: IFigures; secondFigure: IFigures  }>>;
}

export const RoundScreen: React.FC<IRoundScreenProps> = ({ gamePhase }) => {
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

    const [visibleSeparator, setVisibleSeparator] = useState(false);

    useEffect(() => {
        setVisibleSeparator(gamePhase === IGamePhases.startRound)
    }, [gamePhase]);

    const { firstPlayerFigure, secondPlayerFigure } = useAssignFigureToPlayer();

    // TODO: Remove this code before release
    console.log('figure1:', firstPlayerFigure)
    console.log('figure2:', secondPlayerFigure)

    return (
        <div className={styles.roundScreen} id="roundScreen">
            <div className={classNames(styles.separator, visibleSeparator && styles.visible)} />
            { renderFirstPlayer(styles.player) }
            { renderSecondPlayer(styles.player) }
        </div>
    );
};