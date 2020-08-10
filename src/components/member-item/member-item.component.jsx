import React from 'react';
import './member-item.styles.css';

import { Context as MainContext } from '../../context/MainContext';

const MemberItem = ({ member }) => {
  const mainContext = React.useContext(MainContext);

  return (
    <div>
      Party member {member.name}
      <button onClick={() => mainContext.deleteMember(member)}>DEL</button>
    </div>
  );
};

export default MemberItem;
