import React from 'react';
// import styles from './not-found.module.css';

import { Context as MainContext } from '../../context/MainContext';
import { withRouter } from 'react-router-dom';

const NotFound = (props) => {
  const mainContext = React.useContext(MainContext);
  const { lang } = mainContext.state;

  return (
    <div>
      <div>
        <button onClick={() => props.history.go(-1)}>Back</button>
      </div>
      <div>{lang.TXT_NOT_FOUND}</div>
    </div>
  );
};

export default withRouter(NotFound);
