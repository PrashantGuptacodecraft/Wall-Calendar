import React from 'react';
import styles from './App.module.css';
import { WallCalendar } from './components/WallCalendar/WallCalendar';

function App() {
  return (
    <div className={styles.appContainer}>
      <WallCalendar />
    </div>
  );
}

export default App;
