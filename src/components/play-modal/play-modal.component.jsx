import React from 'react';
import styles from './play-modal.module.css';
import { Context as MainContext } from '../../context/MainContext';

const PlayModal = ({ partyName }) => {
  const mainContext = React.useContext(MainContext);
  const { members } = mainContext.state;
  const currentMembers = members.filter((item) => item.partyName === partyName);
  const [order, setOrder] = React.useState([...currentMembers]);

  const play = () => {
    const newOrder = currentMembers.map((item) => {
      let roll = Math.ceil(Math.random() * 20);
      const secondRoll = Math.ceil(Math.random() * 20);

      if (
        (item.advantage && secondRoll > roll) ||
        (item.disadvantage && secondRoll < roll)
      ) {
        roll = secondRoll;
      }

      return {
        name: item.name,
        init: roll + item.modifier,
      };
    });
    setOrder(newOrder);
  };

  return (
    <div className={styles.wrap}>
      <button onClick={() => mainContext.toggleIsPlaying()}>Close</button>
      <div className={styles.memberWrap}>
        {order
          .sort((a, b) => (a.init > b.init ? -1 : a.init < b.init ? 1 : 0))
          .map((item, index) => (
            <div key={index}>
              {item.name} - {item.init}
            </div>
          ))}
      </div>
      <button onClick={() => play()}>PLAY</button>
    </div>
  );
};

export default PlayModal;
