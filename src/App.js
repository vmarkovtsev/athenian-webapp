import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import history from './utils/history';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Waiting from './pages/Waiting';

export default () => {

  return (
    <React.StrictMode>
      <Router history={history}>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/waiting'>
            <Waiting />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};
