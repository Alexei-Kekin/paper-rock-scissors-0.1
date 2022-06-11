import {useEffect} from "react";
import {IFigures, IScores} from "../modules/game/types";

export const useCalculateScores = (firstFigure: string, secondFigure: string, scores: IScores) => {
  const figuresSequences = ['paper', 'scissors', 'rock'];
  let currentWinner;

  useEffect(() => {
    if (figuresSequences.indexOf(firstFigure) > figuresSequences.indexOf(secondFigure)
      || (firstFigure === IFigures.paper && secondFigure === IFigures.rock)
      || (firstFigure !== IFigures.rock && IFigures.paper)
    ) {
      scores.firstPlayerScore += 1;
      currentWinner = 'first player'
    } else {
      scores.secondPlayerScore += 1;
      currentWinner = 'second player'
    }


  }, [firstFigure, secondFigure]);

  return { currentWinner, scores }
}
