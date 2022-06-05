export enum IGamePhases {
    startGame = 'startGame',
    startRound = 'startRound',
    startBetweenRounds = 'startBetweenRounds',
    startResults = 'startResults',
}

export enum IPlayers {
    firstPlayer = 'First player',
    secondPlayer = 'Second player',
}

export enum IResultEvents {
    win = 'WIN',
    draw = 'DRAW'
}


export interface IChosenFigures {
    firstFigure: string,
    secondFigure: string,
}

export enum IFigures {
    unselected = 'unselected',
    paper = 'paper',
    scissors = 'scissors',
    rock = 'rock',
}

export interface IScores {
    firstPlayerScore: number;
    secondPlayerScore: number;
}

export interface IGame {
    gamePhase: string;
    roundTimer: number;
    betweenRoundsTimer: number;
    lastRoundCount: number;
    round: number;
    currentRoundWinner: string;
    scores: IScores;
    firstPlayerFigure: string;
    secondPlayerFigure: string;
}

export interface IStore {
    game: IGame;
}

// export interface IPhaseInstructions {
//     nextGamePhase: string,
//     timerDuration: number,
// }
