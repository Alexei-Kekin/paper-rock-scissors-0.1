import React from 'react';
import styles from './styles/App.module.scss'
interface IAppProps {
}

const App: React.FC<IAppProps> = () => {
  return (
      <div className={styles.app}>
          GAME HERE
      </div>
  );
};

export default App;
