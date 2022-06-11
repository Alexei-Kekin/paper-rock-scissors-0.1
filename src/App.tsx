import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeGamePhase, incrementRoundsCounter, setRoundResult,} from "./modules/game/state/reducer";
import {phaseTimerInstructions} from "./modules/game/state/selectors";
import {resultsHandler} from "./modules/game/tools/tools";
import {IFigures, IGamePhases, IStore} from "./modules/game/types";
import {RoundScreen} from "./modules/game/screens/RoundScreen/RoundScreen";
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
        {/*<StartScreen />*/}
        {/*<SessionResultScreen*/}
        {/*    scores={scores}*/}
        {/*/>*/}
        {/*<BetweenRoundsScreen*/}
        {/*    figures={{*/}
        {/*      firstFigure: IFigures.scissors,*/}
        {/*      secondFigure: IFigures.rock*/}
        {/*    }}*/}
        {/*/>*/}
        <RoundScreen gamePhase={IGamePhases.startRound} chosenFigures={setRoundFigures} />
      </div>
  );
};

export default App;
