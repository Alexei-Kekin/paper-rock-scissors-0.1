import React, {useCallback} from 'react';
import { Button } from "../../../../components/Button/Button";
import { IScreenVisibility } from "../../types";
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StartScreen.module.scss';

interface IStartScreenProps {
    isVisible: IScreenVisibility;
    onStartGame: () => void;
}

export const StartScreen: React.FC<IStartScreenProps> = ({ isVisible, onStartGame }) => (
    <AnimatePresence>
        { isVisible && (
            <motion.div
                className={styles.startScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <video
                    className={styles.video}
                    src={require('../../../../assets/video/StartScreenVideo.mp4')}
                    autoPlay
                    muted
                    loop
                />
                <div className={styles.containerSubTitle}>
                    <span>Choose your side and</span>
                </div>
                <div className={styles.container}>
                    <h1 className={styles.title}>Start battles</h1>
                    <Button className={styles.btn} onClick={onStartGame}>Start</Button>
                </div>
            </motion.div>
        ) }
    </AnimatePresence>
);