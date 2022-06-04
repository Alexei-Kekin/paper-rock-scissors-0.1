import React from 'react';
import styles from './styles/App.module.scss'
import {Button} from "./components/Button/Button";
import {Spinner} from "./components/loaders/Spinner/Spinner";
interface IAppProps {
}

const App: React.FC<IAppProps> = () => {
  return (
      <div className={styles.app}>
          GAME HERE

          <Button>Button</Button>
          <Spinner />
      </div>
  );
};

export default App;
