import React from 'react';
import styles from './member-list.module.css';
import { useParams, Link } from 'react-router-dom';

import { Context as MainContext } from '../../context/MainContext';

import MemberItem from '../../components/member-item/member-item.component.jsx';
import CreateItem from '../../components/create-item/create-item.component.jsx';
import PlayModal from '../../components/play-modal/play-modal.component.jsx';

const MemberList = () => {
  const { partyName } = useParams();
  const mainContext = React.useContext(MainContext);
  const { members, isPlaying, lang } = mainContext.state;
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
      {isPlaying && <PlayModal partyName={partyName} />}
      {!isPlaying && (
        <div className={styles.wrap}>
          <Link to="/">{lang.BTN_MEMBER_LIST_HOME}</Link>
          <h2>
            {lang.TITLE_MEMBER_LIST_PAGE} {partyName}
          </h2>
          <button
            className={styles.topButton}
            onClick={() => mainContext.toggleIsPlaying()}
            disabled={currentMembers.length === 0}
          >
            {lang.BTN_MEMBER_LIST_PLAY}
          </button>
          <form onSubmit={handleSaveSubmit} className={styles.itemList}>
            {currentMembers.map((item, index) => (
              <MemberItem key={`mi${index}`} member={item} />
            ))}
          </form>
          <div className={styles.footer}>
            <h3>{lang.TXT_MEMBER_LIST_CREATE}</h3>
            <CreateItem partyName={partyName} />
          </div>
        </div>
      )}
    </>
  );
};

export default MemberList;
