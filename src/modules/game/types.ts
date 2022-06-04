export enum IGamePhases {
    startGame = 'startGame',
    startRound = 'startRound',
    startBetweenRounds = 'startBetweenRounds',
    startResults = 'startResults',
}

export interface IGameInterface {
    gamePhase: string;
    roundTimer: number;
    betweenRoundsTimer: number;
    lastRoundCount: number;
    round: number;
    firstPlayerScore: number;
    secondPlayerScore: number;
    firstPlayerFigure: string;
    secondPlayerFigure: string;
}
