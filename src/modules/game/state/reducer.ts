import { IGame, IGamePhases } from "../types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IGame = {
    isGameStarted: false,
    gamePhase: IGamePhases.startGame,
    roundTimer: 6000,
    betweenRoundsTimer: 5000,
    lastRoundCount: 4,
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
        }
    }
});

export const { setStartGame, changeGamePhase, incrementRoundsCounter, setRoundFigures, setCurrentRoundResults } = gameSlice.actions;
export default gameSlice.reducer;

// export type RootState = ReturnType<typeof gameSlice>;