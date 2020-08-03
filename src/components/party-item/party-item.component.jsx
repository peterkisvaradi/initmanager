import React from 'react';
import './party-item.styles.css';

import { Context as MainContext } from '../../context/MainContext';

const PartyItem = ({ name }) => {
  const mainContext = React.useContext(MainContext);

  return (
    <div>
      {name}
      <button onClick={() => mainContext.deleteParty(name)}>DEL</button>
    </div>
  );
};

export default PartyItem;
