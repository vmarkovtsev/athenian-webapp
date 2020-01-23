import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/js/bootstrap.js';

import './sass/main.scss';
import App from './App';

import * as serviceWorker from './serviceWorker';

import { Auth0Provider } from './react-auth0-spa';
import history from './utils/history';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={window.ENV.auth.domain}
    client_id={window.ENV.auth.clientId}
    redirect_uri={window.ENV.auth.redirectUri}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
