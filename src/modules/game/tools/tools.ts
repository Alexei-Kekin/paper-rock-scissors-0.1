import { IChosenFigures, IFigures, IPlayers, IResultEvents, IScores } from "../types";

export const resultsHandler = ({firstPlayerFigure, secondPlayerFigure}: IChosenFigures, scores: IScores) => {

  console.log(firstPlayerFigure, secondPlayerFigure, scores)
  //both figures 'unselected'
  if (firstPlayerFigure === secondPlayerFigure) {
    return { currentRoundWinner: IResultEvents.draw, currentScores: scores }
  }
  //each one 'selected'
  const figuresSequences = ['unselected', 'paper', 'scissors', 'rock'];
  let currentRoundWinner;
  let currentScores = {...scores};

  if ((figuresSequences.indexOf(firstPlayerFigure) > figuresSequences.indexOf(secondPlayerFigure) &&
    (firstPlayerFigure !== IFigures.rock || secondPlayerFigure !== IFigures.paper))
    || (firstPlayerFigure === IFigures.paper && secondPlayerFigure === IFigures.rock)) {
    currentScores.firstPlayerScore += 1;
    currentRoundWinner = IPlayers.firstPlayer
  } else {
    currentScores.secondPlayerScore += 1;
    currentRoundWinner = IPlayers.secondPlayer
  }
  return { currentRoundWinner, currentScores }
};
