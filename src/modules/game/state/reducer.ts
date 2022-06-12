import { IGame, IGamePhases } from "../types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IGame = {
    isGameStarted: false,
    gamePhase: IGamePhases.startGame,
    roundTimer: 3000,
    betweenRoundsTimer: 5000,
    lastRoundCount: 4,
    round: 1,
    currentRoundWinner: '',
    scores: {
        firstPlayerScore: 0,
        secondPlayerScore: 0,
    },
    selectedFigures: {
        firstPlayerFigure: '',
        secondPlayerFigure: '',
    }
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
        setRoundResult: (state, action) => {
            state.scores = action.payload.scores;
            state.currentRoundWinner = action.payload.currentWinner;
        },
        incrementRoundsCounter: (state, action) => {
            state.round = action.payload;
        },
        setRoundFigures: (state, action) => {
            state.selectedFigures = action.payload;
        }
    }
});

export const { setStartGame, changeGamePhase, setRoundResult, incrementRoundsCounter, setRoundFigures } = gameSlice.actions;
export default gameSlice.reducer;

// export type RootState = ReturnType<typeof gameSlice>;