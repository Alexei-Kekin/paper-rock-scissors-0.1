import { createSelector } from "@reduxjs/toolkit";
import { IFigures, IGamePhases, IPlayers, IResultEvents, IStore } from "../types";

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
