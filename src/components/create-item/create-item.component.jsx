import React from 'react';
// import styles from './create-item.module.css';

import { Context as MainContext } from '../../context/MainContext';

const CreateItem = ({ partyName }) => {
  const [state, setState] = React.useState({
    newPartyName: '',
    newMemberName: '',
    error: false,
  });
  const mainContext = React.useContext(MainContext);
  const { members, parties, lang } = mainContext.state;
  const currentMembers = members.filter((item) => item.partyName === partyName);
  const memberNames = currentMembers.map((item) => item.name);

  const handleChange = (event) => {
    const { value } = event.target;
    if (partyName) {
      setState({
        newMemberName: value,
        error: memberNames.includes(value),
      });
    } else {
      setState({
        newPartyName: value,
        error: parties.includes(value),
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
          created: Date.now(),
          init: 0,
        });
      } else {
        mainContext.addParty(state.newPartyName);
      }
      setState({ newPartyName: '', newMemberName: '', error: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {partyName
          ? lang.TXT_CREATE_ITEM_MEMBER_TITLE
          : lang.TXT_CREATE_ITEM_PARTY_TITLE}
      </label>
      <input
        value={partyName ? state.newMemberName : state.newPartyName}
        onChange={handleChange}
        required
      />
      <button disabled={state.error} type="submit">
        {lang.BTN_CREATE_ITEM_BUTTON}
      </button>
      {state.error && (
        <div>
          {partyName
            ? lang.TXT_CREATE_ITEM_MEMBER_NAME_ERROR
            : lang.TXT_CREATE_PARTY_ERROR}
        </div>
      )}
    </form>
  );
};

export default CreateItem;
