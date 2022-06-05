import { IChosenFigures, IFigures, IPlayers, IResultEvents, IScores } from "../types";

export const resultsHandler = ({firstFigure, secondFigure}: IChosenFigures, scores: IScores) => {
  //both figures 'unselected'
  if (firstFigure === IFigures.unselected && secondFigure === IFigures.unselected) {
    return { currentWinner: IResultEvents, scores }
  }
  //each one 'selected'
  const figuresSequences = ['unselected', 'paper', 'scissors', 'rock'];
  let currentWinner;

  if (figuresSequences.indexOf(firstFigure) > figuresSequences.indexOf(secondFigure)
    || (firstFigure === IFigures.paper && secondFigure === IFigures.rock)
    || (firstFigure !== IFigures.rock && IFigures.paper)) {
    scores.firstPlayerScore += 1;
    currentWinner = IPlayers.firstPlayer
  } else {
    scores.secondPlayerScore += 1;
    currentWinner = IPlayers.secondPlayer
  }

  return { currentWinner, scores }
};
