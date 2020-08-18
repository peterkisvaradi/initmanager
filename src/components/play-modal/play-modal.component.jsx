import React from 'react';
import styles from './play-modal.module.css';
import { Context as MainContext } from '../../context/MainContext';

const PlayModal = () => {
  const mainContext = React.useContext(MainContext);
  return (
    <div className={styles.wrap}>
      <button onClick={() => mainContext.toggleIsPlaying()}>Close</button>PLAY
      MODAL
    </div>
  );
};

export default PlayModal;
