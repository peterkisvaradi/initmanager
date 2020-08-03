import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NotFound from './pages/not-found/not-found.page.jsx';
import PartyList from './pages/party-list/party-list.page.jsx';

import { Context as MainContext } from './context/MainContext';

function App() {
  const mainContext = React.useContext(MainContext);

  /* eslint-disable react-hooks/exhaustive-deps*/
  React.useEffect(() => {
    mainContext.preloadParties();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps*/

  return (
    <Router>
      <Switch>
        <Route path="/" name="Party List" exact>
          <PartyList />
        </Route>
        <Router path="*" name="Not Found">
          <NotFound />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
