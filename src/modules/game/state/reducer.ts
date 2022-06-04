import {IGameInterface, IGamePhases} from "../types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IGameInterface = {
    gamePhase: IGamePhases.startGame,
    roundTimer: 3,
    betweenRoundsTimer: 5,
    lastRoundCount: 5,
    round: 1,
    firstPlayerScore: 0,
    secondPlayerScore: 0,
    firstPlayerFigure: '',
    secondPlayerFigure: '',
}

const gameSlice = createSlice({
    name: 'gameReducer',
    initialState,
    reducers: {

    }
})