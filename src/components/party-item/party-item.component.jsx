import React from 'react';
// import styles from './party-item.module.css';

import { Link } from 'react-router-dom';

import { Context as MainContext } from '../../context/MainContext';

const PartyItem = ({ name }) => {
  const mainContext = React.useContext(MainContext);
  const { lang } = mainContext.state;

  return (
    <div>
      <Link to={`/memberList/${name}`}>{name}</Link>
      <button onClick={() => mainContext.deleteParty(name)}>
        {lang.BTN_PARTY_ITEM_DELETE}
      </button>
    </div>
  );
};

export default PartyItem;
