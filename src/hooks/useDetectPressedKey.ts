import { useEffect, useState } from "react";

export const useDetectPressedKey = () => {
    const [keyPressed, setKeyPressed] = useState<string>('');

    useEffect(() => {
        const setKey = (event: KeyboardEvent) => setKeyPressed(event.code);
        document.addEventListener('keydown', setKey);

        return () => document.removeEventListener('keydown', setKey);
    }, [keyPressed])

    return keyPressed;
}