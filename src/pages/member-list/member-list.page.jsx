import React from 'react';
import './member-list.styles-css';
import { useParams } from 'react-router-dom';

import { Context as MainContext } from '../../context/MainContext';

import MemberItem from '../../components/member-item/member-item.component.jsx';
import CreateItem from '../../components/create-item/create-item-component.jsx';

const MemberList = () => {
  const { partyName } = useParams();
  const [state, setState] = React.useState({ memberName: '' });
  const mainContext = React.useContext(MainContext);
  const { members } = mainContext.state;

  const handleChange = (event) => {
    setState({
      memberName: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mainContext.addMember({ name: state.memberName, partyName });
    setState({ memberName: '' });
  };

  return (
    <div className="wrap">
      <h2>Party members of {partyName}</h2>
      <div className="itemlist">
        {members
          .filter((member) => member.partyName === partyName)
          .map((item, index) => (
            <MemberItem key={`mi${index}`} member={item} />
          ))}
      </div>
      <div className="footer">
        <h3>Create new member:</h3>
        <CreateItem
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          inputValue={state.memberName}
          error={state.error}
          label="Create Member"
          buttonTitle="Create"
        />
      </div>
    </div>
  );
};

export default MemberList;
