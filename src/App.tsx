import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  changeGamePhase,
  incrementRoundsCounter,
  setRoundResult,
} from "./modules/game/state/reducer";
import { phaseTimerInstructions } from "./modules/game/state/selectors";
import { resultsHandler } from "./modules/game/tools/tools";
//Screens
import { SessionResultScreen } from "./modules/game/screens/SessionResultScreen";
//Reused components
import { Button } from "./components/Button/Button";
import { Spinner } from "./components/loaders/Spinner/Spinner";
import { IFigures, IGamePhases, IStore } from "./modules/game/types";
import styles from './styles/App.module.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const scores = useSelector((state: IStore) => state.game.scores);
  const round = useSelector((state:IStore) => state.game.round);
  const gamePhase = useSelector((state:IStore) => state.game.gamePhase);
  const phaseInstructions = useSelector((state:IStore) => phaseTimerInstructions(state));

  const [roundFigures, setRoundFigures] = useState({
    firstFigure: IFigures.unselected,
    secondFigure: IFigures.unselected,
  });


  useEffect(() => {
    if (gamePhase !== IGamePhases.startGame || IGamePhases.startResults) {
      setTimeout(() => {
        if (gamePhase === IGamePhases.startRound) {
          dispatch(setRoundResult(resultsHandler(roundFigures, scores)))
        }
        if (gamePhase === IGamePhases.startBetweenRounds) {
          dispatch(incrementRoundsCounter(round + 1));
        }
        dispatch(changeGamePhase(phaseInstructions.nextGamePhase))
      }, phaseInstructions.timerDuration)
    }

  }, [gamePhase]);

  return (
    <div className={styles.app}>


      <SessionResultScreen
        scores={scores}
      />
    </div>
  );
};

export default App;
