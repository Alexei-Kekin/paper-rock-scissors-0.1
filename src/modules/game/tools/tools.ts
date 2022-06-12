import { IChosenFigures, IFigures, IPlayers, IResultEvents, IScores } from "../types";

export const resultsHandler = ({firstPlayerFigure, secondPlayerFigure}: IChosenFigures, scores: IScores) => {
  //both figures 'unselected'
  if ((firstPlayerFigure === IFigures.unselected && secondPlayerFigure === IFigures.unselected) || firstPlayerFigure === secondPlayerFigure) {
    return { currentWinner: IResultEvents.draw, scores }
  }
  //each one 'selected'
  const figuresSequences = ['unselected', 'paper', 'scissors', 'rock'];
  let currentWinner;

  if (figuresSequences.indexOf(firstPlayerFigure) > figuresSequences.indexOf(secondPlayerFigure)
      && (secondPlayerFigure !== IFigures.paper || firstPlayerFigure !== IFigures.rock)) {
    scores.firstPlayerScore += 1;
    currentWinner = IPlayers.firstPlayer
  } else {
    scores.secondPlayerScore += 1;
    currentWinner = IPlayers.secondPlayer
  }

  return { currentWinner, scores }
};
