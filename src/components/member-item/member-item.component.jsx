import React from 'react';
import './member-item.styles.css';

import { Context as MainContext } from '../../context/MainContext';

const MemberItem = ({ member }) => {
  const mainContext = React.useContext(MainContext);
  const { name, modifier, advantage, disadvantage } = member;
  const [state, setState] = React.useState({
    error: false,
    advantage,
    disadvantage,
    modifier,
    name,
  });

  const handleNameChange = (event) => {
    setState({ ...state, name: event.target.value });
  };
  const handleModifierChange = (event) => {
    setState({ ...state, modifier: event.target.value });
  };
  const handleAdvantageChange = (event) => {
    setState({ ...state, advantage: event.target.checked });
  };
  const handleDisadvantageChange = (event) => {
    setState({ ...state, disadvantage: event.target.checked });
  };

  return (
    <div>
      Name: <input type="text" value={state.name} onChange={handleNameChange} />
      Modifier: <input value={state.modifier} onChange={handleModifierChange} />
      Advantage:
      <input
        type="checkbox"
        checked={state.advantage}
        onChange={handleAdvantageChange}
        disabled={state.disadvantage}
      />
      Disadvantage:
      <input
        type="checkbox"
        checked={state.disadvantage}
        onChange={handleDisadvantageChange}
        disabled={state.advantage}
      />
      <button onClick={() => mainContext.deleteMember(member)}>DEL</button>
    </div>
  );
};

export default MemberItem;
