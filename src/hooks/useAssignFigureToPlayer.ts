import { useEffect, useState } from "react";
import { useDetectPressedKey } from "./useDetectPressedKey";
import { IFigures } from "../modules/game/types";

export const useAssignFigureToPlayer = () => {
    const [firstPlayerFigure, setFirstPlayerFigure] = useState<string>(IFigures.unselected)
    const [secondPlayerFigure, setSecondPlayerFigure] = useState<string>(IFigures.unselected)

    const keyPressed = useDetectPressedKey();

    useEffect(() => {
        if (keyPressed === 'KeyQ' || keyPressed === 'KeyW' || keyPressed === 'KeyE' || keyPressed === 'Numpad1' ||
            keyPressed === 'Numpad2' || keyPressed === 'Numpad3') {
            switch (keyPressed) {
                case 'KeyQ':
                    setFirstPlayerFigure(IFigures.paper)
                    break;

                case 'KeyW':
                    setFirstPlayerFigure(IFigures.scissors)
                    break;

                case 'KeyE':
                    setFirstPlayerFigure(IFigures.rock)
                    break;

                case 'Numpad1':
                    setSecondPlayerFigure(IFigures.paper)
                    break;

                case 'Numpad2':
                    setSecondPlayerFigure(IFigures.scissors)
                    break;

                case 'Numpad3':
                    setSecondPlayerFigure(IFigures.rock)
                    break;

                default:
            }
        }
    }, [keyPressed]);

    return { firstPlayerFigure, secondPlayerFigure };
}