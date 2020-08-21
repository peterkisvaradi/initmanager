import React from 'react';
import styles from './party-list.module.css';

import { Context as MainContext } from '../../context/MainContext';

import PartyItem from '../../components/party-item/party-item.component';
import CreateItem from '../../components/create-item/create-item.component.jsx';

const PartyList = () => {
  const mainContext = React.useContext(MainContext);
  const { lang, parties } = mainContext.state;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{lang.TITLE_PARTY_LIST_PAGE}</h2>
      <div className={styles.contentWrap}>
        {parties &&
          parties.map((item, index) => (
            <PartyItem name={item} key={`pi${index}`} />
          ))}
      </div>
      <div className={styles.footer}>
        <h3>{lang.TXT_PARTY_LIST_CREATE}</h3>
        <CreateItem />
      </div>
    </div>
  );
};

export default PartyList;
