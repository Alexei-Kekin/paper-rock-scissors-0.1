import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    setStartGame,
    changeGamePhase,
    incrementRoundsCounter,
    setRoundResult,
    setRoundFigures as setFigures
} from "./modules/game/state/reducer";
import { phaseTimerInstructions } from "./modules/game/state/selectors";
import { resultsHandler } from "./modules/game/tools/tools";
import { IFigures, IGamePhases, IPlayers, IStore } from "./modules/game/types";
import { StartScreen } from "./modules/game/screens/StartScreen/StartScreen";
import { RoundScreen } from "./modules/game/screens/RoundScreen/RoundScreen";
import { BetweenRoundsScreen } from "./modules/game/screens/BetweenRoundsScreen/BetweenRoundsScreen";
import { SessionResultScreen } from "./modules/game/screens/SessionResultScreen/SessionResultScreen";
import styles from './styles/App.module.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const scores = useSelector((state: IStore) => state.game.scores);
  const round = useSelector((state:IStore) => state.game.round);
  const gamePhase = useSelector((state:IStore) => state.game.gamePhase);
  const phaseInstructions = useSelector((state:IStore) => phaseTimerInstructions(state));
  //For BetweenRoundScreen props
  const selectedFigures = useSelector((state: IStore) => state.game.selectedFigures);
  const currentRoundWinner = useSelector((state:IStore) => state.game.currentRoundWinner);

  console.log('selected', selectedFigures)
  const [roundFigures, setRoundFigures] = useState({
    firstPlayerFigure: IFigures.unselected,
    secondPlayerFigure: IFigures.unselected,
  });

  const handleStartGame = useCallback(() => {
      dispatch(setStartGame(true));
      dispatch(changeGamePhase(IGamePhases.startRound));
  }, []);

  const calcRoundWinner = useMemo(() => resultsHandler(roundFigures, {...scores}), [roundFigures]);

    // console.log('FIGURES', roundFigures)

  useEffect(() => {
    if (gamePhase !== IGamePhases.startGame && gamePhase !== IGamePhases.startResults) {
      setTimeout(() => {

        if (gamePhase === IGamePhases.startRound) {
          dispatch(setRoundResult(calcRoundWinner))
          setRoundFigures({
              firstPlayerFigure: IFigures.unselected,
              secondPlayerFigure: IFigures.unselected,
          });
        }
        if (gamePhase === IGamePhases.startBetweenRounds) {
          dispatch(incrementRoundsCounter(round + 1));
        }
        dispatch(changeGamePhase(phaseInstructions.nextGamePhase))
      }, phaseInstructions.timerDuration)
    }
  }, [gamePhase]);

  // useEffect(() => {
  //   const { firstPlayerFigure, secondPlayerFigure } = roundFigures;
  //   dispatch(setFigures({
  //     firstPlayerFigure,
  //     secondPlayerFigure,
  //   }))
  // }, [roundFigures.firstPlayerFigure, roundFigures.secondPlayerFigure]);

  return (
      <div className={styles.app}>
        <StartScreen
            isVisible={gamePhase === IGamePhases.startGame}
            onStartGame={handleStartGame}
        />
        <RoundScreen
            chosenFigures={setRoundFigures}
            isVisible={gamePhase === IGamePhases.startRound}
        />
        <BetweenRoundsScreen
            isVisible={gamePhase === IGamePhases.startBetweenRounds}
            figures={selectedFigures}
            currentRoundWinner={currentRoundWinner}
        />
        <SessionResultScreen
          isVisible={gamePhase === IGamePhases.startResults}
          scores={scores}
        />
      </div>
  );
};

export default App;
