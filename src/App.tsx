import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  changeGamePhase,
  incrementRoundsCounter, setCurrentRoundResults,
  setRoundFigures as setFigures,
  setStartGame
} from "./modules/game/state/reducer";
import { phaseTimerInstructions } from "./modules/game/state/selectors";
import { StartScreen } from "./modules/game/screens/StartScreen/StartScreen";
import { RoundScreen } from "./modules/game/screens/RoundScreen/RoundScreen";
import { BetweenRoundsScreen } from "./modules/game/screens/BetweenRoundsScreen/BetweenRoundsScreen";
import { SessionResultScreen } from "./modules/game/screens/SessionResultScreen/SessionResultScreen";
import { IFigures, IGamePhases, IStore } from "./modules/game/types";
import styles from './styles/App.module.scss';
import {resultsHandler} from "./modules/game/tools/tools";

const App: React.FC = () => {
  const dispatch = useDispatch();


  const round = useSelector((state:IStore) => state.game.round);
  const scores = useSelector((state:IStore) => state.game.scores);
  const gamePhase = useSelector((state:IStore) => state.game.gamePhase);
  const phaseInstructions = useSelector((state:IStore) => phaseTimerInstructions(state));
  //For BetweenRoundScreen props
  const selectedFigures = useSelector((state: IStore) => state.game.selectedFigures);
  const currentWinner = useSelector((state: IStore) => state.game.currentRoundWinner);

  const [roundFigures, setRoundFigures] = useState({
    firstPlayerFigure: IFigures.unselected,
    secondPlayerFigure: IFigures.unselected,
  });

  const [isRoundResultsSetEnable, setIsRoundResultsSetEnable] = useState(false);

  const handleStartGame = useCallback(() => {
      dispatch(setStartGame(true));
      dispatch(changeGamePhase(IGamePhases.startRound));
  }, []);


  useEffect(() => {
    if (gamePhase !== IGamePhases.startGame && gamePhase !== IGamePhases.startResults) {

      setTimeout(() => {
        if (gamePhase === IGamePhases.startRound) {
          setIsRoundResultsSetEnable(true);
        }
        if (gamePhase === IGamePhases.startBetweenRounds) {
          dispatch(incrementRoundsCounter(round + 1));
        }
        dispatch(changeGamePhase(phaseInstructions.nextGamePhase))
      }, phaseInstructions.timerDuration)
    }
  }, [gamePhase]);

  useEffect(() => {
    if (isRoundResultsSetEnable) {
      console.log('1')
      const { firstPlayerFigure, secondPlayerFigure } = roundFigures;
      dispatch(setFigures({
        firstPlayerFigure,
        secondPlayerFigure,
      }))
      dispatch(setCurrentRoundResults(
        resultsHandler(
          {firstPlayerFigure, secondPlayerFigure},
          scores,
        )
      ));
      setIsRoundResultsSetEnable(!isRoundResultsSetEnable);
    }
  }, [isRoundResultsSetEnable]);


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
          currentRoundWinner={currentWinner}
      />
      <SessionResultScreen
        isVisible={gamePhase === IGamePhases.startResults}
        scores={scores}
      />
    </div>
  );
};

export default App;
