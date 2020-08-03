import React from 'react';
import './party-item.styles.css';

import { Link } from 'react-router-dom';

import { Context as MainContext } from '../../context/MainContext';

const PartyItem = ({ name }) => {
  const mainContext = React.useContext(MainContext);

  return (
    <div>
      <Link to={`/memberList/${name}`}>{name}</Link>
      <button onClick={() => mainContext.deleteParty(name)}>DEL</button>
    </div>
  );
};

export default PartyItem;
