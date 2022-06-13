import { createSelector } from "@reduxjs/toolkit";
import {IFigures, IGamePhases, IPlayers, IResultEvents, IStore} from "../types";

const isGameStarted = (state: IStore) => state.game.isGameStarted;
const roundTimer = (state: IStore) => state.game.roundTimer;
const betweenRoundsTimer = (state: IStore) => state.game.betweenRoundsTimer;
const gamePhase = (state: IStore) => state.game.gamePhase;
const lastRoundCount = (state: IStore) => state.game.lastRoundCount;
const round = (state: IStore) => state.game.round;


export const phaseTimerInstructions:any = createSelector(
  [isGameStarted, gamePhase, roundTimer, betweenRoundsTimer, round, lastRoundCount],
  (isGameStarted, gamePhase, roundTimer, betweenRoundsTimer, round, lastRoundCount) => {
    let result = {
      nextGamePhase: '',
      timerDuration: gamePhase === IGamePhases.startGame ? roundTimer : betweenRoundsTimer,
    };

    switch (gamePhase) {
      case IGamePhases.startGame:
        result.nextGamePhase = isGameStarted ? IGamePhases.startRound : IGamePhases.startGame;
        break;

      case IGamePhases.startRound:
        result.nextGamePhase = IGamePhases.startBetweenRounds;
        break;

      case IGamePhases.startBetweenRounds:
        result.nextGamePhase = round < lastRoundCount ? IGamePhases.startRound : IGamePhases.startResults;
        break;
    }
    return result;
  });

// export const currentRoundResults:any = createSelector(
//   [selectedFigures, gamePhase, scores],
//   (selectedFigures, gamePhase, scores) => {
//     // console.log({selectedFigures, gamePhase, scores});
//
//     if (gamePhase === IGamePhases.startBetweenRounds) {
//       const { firstPlayerFigure, secondPlayerFigure } = selectedFigures;
//       //both figures 'unselected'
//       if (firstPlayerFigure === secondPlayerFigure) {
//         return { selectedFigures, currentWinner: IResultEvents.draw, scores }
//       }
//       //each one 'selected'
//       const figuresSequences = ['unselected', 'paper', 'scissors', 'rock'];
//
//       let currentWinner;
//       let currentScores = {...scores};
//
//       if (figuresSequences.indexOf(firstPlayerFigure) > figuresSequences.indexOf(secondPlayerFigure)
//         && (secondPlayerFigure !== IFigures.paper || firstPlayerFigure !== IFigures.rock)) {
//         currentScores.firstPlayerScore += 1;
//         currentWinner = IPlayers.firstPlayer
//       } else {
//         currentScores.secondPlayerScore += 1;
//         currentWinner = IPlayers.secondPlayer
//       }
//       return { selectedFigures, currentWinner, currentScores }
//     } else {
//       return { selectedFigures, currentWinner: IResultEvents.draw , scores }
//     }
//   }
// );
