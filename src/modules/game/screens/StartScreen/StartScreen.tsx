import React from 'react';
import { Button } from "../../../../components/Button/Button";
import styles from './StartScreen.module.scss';

interface IStartScreenProps {
}

export const StartScreen: React.FC<IStartScreenProps> = () => {
    return (
        <div className={styles.startScreen}>
            <video
                className={styles.video}
                src={require('../../../../assets/video/StartScreenVideo.mp4')}
                autoPlay
                muted
                loop
            />
            <div className={styles.container}>
                <h1 className={styles.title}>Start battles</h1>
                <Button className={styles.btn}>Button</Button>
            </div>
        </div>
    );
};