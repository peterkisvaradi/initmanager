import React from 'react';
import './party-list.styles.css';

import { Context as MainContext } from '../../context/MainContext';

import PartyItem from '../../components/party-item/party-item.component';
import CreateItem from '../../components/create-item/create-item-component.jsx';

const PartyList = () => {
  const [state, setState] = React.useState({ partyName: '', error: false });
  const mainContext = React.useContext(MainContext);
  const { lang, parties } = mainContext.state;

  const handleChange = (event) => {
    setState({
      partyName: event.target.value,
      error: parties.includes(event.target.value),
    });
  };

  const handleSubmit = (event) => {
    if (!state.error) {
      event.preventDefault();
      mainContext.addParty(state.partyName);
      setState({ partyName: '', error: false });
    }
  };

  return (
    <div className="wrap">
      <h2 className="title">{lang.TITLE_PARTY_LIST_PAGE}</h2>
      <div className="contentwrap">
        {parties &&
          parties.map((item, index) => (
            <PartyItem name={item} key={`pi${index}`} />
          ))}
      </div>
      <div className="footer">
        <h3>Create new party:</h3>
        <CreateItem
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          inputValue={state.partyName}
          error={state.error}
          label="Create Party"
          buttonTitle="Create"
        />
      </div>
    </div>
  );
};

export default PartyList;
