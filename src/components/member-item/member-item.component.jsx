import React from 'react';
import './member-item.styles.css';

import { Context as MainContext } from '../../context/MainContext';

const MemberItem = ({ member }) => {
  const mainContext = React.useContext(MainContext);
  const { name, modifier, advantage, disadvantage } = member;
  const [state, setState] = React.useState({
    error: false,
    memberObject: {
      advantage,
      disadvantage,
      modifier,
      name,
    },
  });
  const currentMembers = mainContext.state.members.filter(
    (item) => item.partyName === member.partyName
  );
  const memberNames = currentMembers.map((item) => item.name);

  React.useEffect(() => {
    if (!state.error) {
      mainContext.updateMember(state.memberObject);
    }
  });

  const handleNameChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setState((prevState) => {
      return {
        ...prevState,
        memberObject: { ...prevState.memberObject, name: value },
        error: memberNames.includes(value) || value === '',
      };
    });
  };
  const handleModifierChange = (event) => {
    const { value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        memberObject: {
          ...prevState.memberObject,
          modifier: value,
        },
      };
    });
  };
  const handleAdvantageChange = (event) => {
    const { checked } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        memberObject: {
          ...prevState.memberObject,
          advantage: checked,
        },
      };
    });
  };
  const handleDisadvantageChange = (event) => {
    const { checked } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        memberObject: {
          ...prevState.memberObject,
          disadvantage: checked,
        },
      };
    });
  };

  return (
    <div>
      Name:
      <input
        type="text"
        value={state.memberObject.name}
        onChange={handleNameChange}
      />
      Modifier:
      <input
        value={state.memberObject.modifier}
        onChange={handleModifierChange}
      />
      Advantage:
      <input
        type="checkbox"
        checked={state.memberObject.advantage}
        onChange={handleAdvantageChange}
        disabled={state.memberObject.disadvantage}
      />
      Disadvantage:
      <input
        type="checkbox"
        checked={state.memberObject.disadvantage}
        onChange={handleDisadvantageChange}
        disabled={state.memberObject.advantage}
      />
      <button onClick={() => mainContext.deleteMember(member)}>DEL</button>
      {state.error && <div>ERROR egyező vagy üres név</div>}
    </div>
  );
};

export default MemberItem;
