import React from 'react';
// import styles from './member-item.module.css';

import { Context as MainContext } from '../../context/MainContext';

const MemberItem = ({ member }) => {
  const mainContext = React.useContext(MainContext);
  const { lang } = mainContext.state;
  const {
    name,
    modifier,
    advantage,
    disadvantage,
    partyName,
    created,
    init,
  } = member;
  const [state, setState] = React.useState({
    error: false,
    memberObject: {
      name,
      partyName,
      modifier,
      advantage,
      disadvantage,
      created,
      init,
    },
  });
  /* const currentMembers = mainContext.state.members.filter(
    (item) => item.partyName === member.partyName
  );
  const memberNames = currentMembers.map((item) => item.name); */

  const isInitialMount = React.useRef(true);

  /* eslint-disable react-hooks/exhaustive-deps*/
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!state.error) {
        mainContext.updateMember(state.memberObject);
      }
    }
  }, [state.memberObject]);
  /* eslint-enable react-hooks/exhaustive-deps*/

  /* const handleNameChange = (event) => {
    const { value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        memberObject: { ...prevState.memberObject, name: value },
        error: memberNames.includes(value) || value === '',
      };
    });
  }; */

  const handleModifierChange = (event) => {
    const { value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        memberObject: {
          ...prevState.memberObject,
          modifier: parseInt(value),
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
      {`${lang.TXT_MEMBER_ITEM_NAME} ${state.memberObject.name} > `}
      {/* <input
        type="text"
        value={state.memberObject.name}
        onChange={handleNameChange}
      /> */}
      {lang.TXT_MEMBER_ITEM_MODIFIER}
      <input
        value={state.memberObject.modifier}
        onChange={handleModifierChange}
        type="number"
      />
      {lang.TXT_MEMBER_ITEM_ADVANTAGE}
      <input
        type="checkbox"
        checked={state.memberObject.advantage}
        onChange={handleAdvantageChange}
        disabled={state.memberObject.disadvantage}
      />
      {lang.TXT_MEMBER_ITEM_DISADVANTAGE}
      <input
        type="checkbox"
        checked={state.memberObject.disadvantage}
        onChange={handleDisadvantageChange}
        disabled={state.memberObject.advantage}
      />
      <button onClick={() => mainContext.deleteMember(member)}>
        {lang.BTN_MEMBER_ITEM_DELETE}
      </button>
      {state.error && <div>{lang.TXT_MEMBER_ITEM_MODIFIER}</div>}
    </div>
  );
};

export default MemberItem;
