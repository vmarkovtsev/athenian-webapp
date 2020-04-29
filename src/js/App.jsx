import React from 'react';
import ReactDOM from 'react-dom';

import {
    Router,
} from 'react-router-dom';

import Routes from 'js/Routes';

import * as serviceWorker from 'js/services/serviceWorker';
import { Auth0Provider } from 'js/context/Auth0';
import history from 'js/services/history';
import Development from 'js/components/development';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  let qp = new URLSearchParams(appState).toString();
  history.push('/callback?' + qp);
};

ReactDOM.render(<>
  <Auth0Provider
    domain={window.ENV.auth.domain}
    client_id={window.ENV.auth.clientId}
    redirect_uri={window.ENV.auth.redirectUri}
    audience={window.ENV.auth.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <React.StrictMode>
      <Router history={history}>
        <Routes />
      </Router>
    </React.StrictMode>
  </Auth0Provider>
  {process.env.NODE_ENV === 'development' && <Development.Breakpoints />}
</>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
