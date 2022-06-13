import { createSlice } from "@reduxjs/toolkit";
import { IGame, IGamePhases } from "../types";

const initialState: IGame = {
    isGameStarted: false,
    gamePhase: IGamePhases.startGame,
    roundTimer: 4000,
    betweenRoundsTimer: 5000,
    lastRoundCount: 11,
    round: 1,
    scores: {
        firstPlayerScore: 0,
        secondPlayerScore: 0,
    },
    selectedFigures: {
        firstPlayerFigure: '',
        secondPlayerFigure: '',
    },
    currentRoundWinner: '',
}

const gameSlice = createSlice({
  name: 'gameReducer',
  initialState,
  reducers: {
    setStartGame: (state, action) => {
      state.isGameStarted = action.payload;
    },
    changeGamePhase: (state, action) => {
      state.gamePhase = action.payload;
    },
    setCurrentRoundResults: (state, action) => {
      state.currentRoundWinner = action.payload.currentRoundWinner;
      state.scores = action.payload.currentScores;
    },
    incrementRoundsCounter: (state, action) => {
      state.round = action.payload;
    },
    setRoundFigures: (state, action) => {
      state.selectedFigures = action.payload;
    },
    resetAppState: () => initialState,
  }
});

export const {
  setStartGame,
  changeGamePhase,
  incrementRoundsCounter,
  setRoundFigures,
  setCurrentRoundResults,
  resetAppState,
} = gameSlice.actions;
export default gameSlice.reducer;
