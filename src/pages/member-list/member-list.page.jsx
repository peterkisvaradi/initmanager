import React from 'react';
import './member-list.styles-css';
import { useParams } from 'react-router-dom';

import { Context as MainContext } from '../../context/MainContext';

import MemberItem from '../../components/member-item/member-item.component.jsx';
import CreateItem from '../../components/create-item/create-item.component.jsx';

const MemberList = () => {
  const { partyName } = useParams();
  const mainContext = React.useContext(MainContext);
  const { members } = mainContext.state;
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
    <div className="wrap">
      <h2>Party members of {partyName}</h2>
      <form onSubmit={handleSaveSubmit}>
        <div className="itemlist">
          {currentMembers.map((item, index) => (
            <MemberItem key={`mi${index}`} member={item} />
          ))}
        </div>
      </form>
      <div className="footer">
        <h3>Create new member:</h3>
        <CreateItem partyName={partyName} />
      </div>
    </div>
  );
};

export default MemberList;
