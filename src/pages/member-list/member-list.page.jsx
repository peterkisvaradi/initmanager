import React from 'react';
import styles from './member-list.module.css';
import { useParams } from 'react-router-dom';

import { Context as MainContext } from '../../context/MainContext';

import MemberItem from '../../components/member-item/member-item.component.jsx';
import CreateItem from '../../components/create-item/create-item.component.jsx';
import PlayModal from '../../components/play-modal/play-modal.component.jsx';

const MemberList = () => {
  const { partyName } = useParams();
  const mainContext = React.useContext(MainContext);
  const { members, isPlaying } = mainContext.state;
  const currentMembers = members
    .filter((item) => item.partyName === partyName)
    .sort((a, b) => {
      if (a.created < b.created) {
        return -1;
      }
      if (a.created > b.created) {
        return 1;
      }
      return 0;
    });

  const handleSaveSubmit = (event) => {
    event.preventDefault();
    console.log('ASAVE');
  };

  return (
    <>
      {isPlaying && <PlayModal />}
      {!isPlaying && (
        <div className={styles.wrap}>
          <h2>Party members of {partyName}</h2>
          <button onClick={() => mainContext.toggleIsPlaying()}>PLAY</button>
          <form onSubmit={handleSaveSubmit}>
            <div className={styles.itemlist}>
              {currentMembers.map((item, index) => (
                <MemberItem key={`mi${index}`} member={item} />
              ))}
            </div>
          </form>
          <div className={styles.footer}>
            <h3>Create new member:</h3>
            <CreateItem partyName={partyName} />
          </div>
        </div>
      )}
    </>
  );
};

export default MemberList;
