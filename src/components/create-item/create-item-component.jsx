import React from 'react';
import './create-item.styles.css';

import { Context as MainContext } from '../../context/MainContext';

const CreateItem = ({ partyName }) => {
  const [state, setState] = React.useState({
    newPartyName: '',
    newMemberName: '',
    error: false,
  });
  const mainContext = React.useContext(MainContext);
  const { members, parties } = mainContext.state;
  const currentMembers = members.filter((item) => item.partyName === partyName);
  const memberNames = currentMembers.map((item) => item.name);

  const handleChange = (event) => {
    if (partyName) {
      setState({
        newMemberName: event.target.value,
        error: memberNames.includes(event.target.value),
      });
    } else {
      setState({
        newPartyName: event.target.value,
        error: parties.includes(event.target.value),
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!state.error) {
      if (partyName) {
        mainContext.addMember({
          name: state.newMemberName,
          partyName,
          modifier: 0,
          advantage: false,
          disadvantage: false,
        });
      } else {
        mainContext.addParty(state.newPartyName);
      }
      setState({ newPartyName: '', newMemberName: '', error: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{partyName ? 'Create new member:' : 'Create new party:'}</label>
      <input
        value={partyName ? state.newMemberName : state.newPartyName}
        onChange={handleChange}
        required
      />
      <button disabled={state.error} type="submit">
        Create
      </button>
      {state.error && <div>ERROR</div>}
    </form>
  );
};

export default CreateItem;
