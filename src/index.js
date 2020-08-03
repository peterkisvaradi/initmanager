import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider as MainProvider } from './context/MainContext';
import lang from './data/lang-hu.json';

ReactDOM.render(
  <React.StrictMode>
    <MainProvider injectState={{ lang }}>
      <App />
    </MainProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
