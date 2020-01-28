import React from 'react';

import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';

import history from 'js/services/history';

import PrivateRoute from 'js/PrivateRoute';

import Home from 'js/pages/Home';
import Login from 'js/pages/auth/Login';
import Logout from 'js/pages/auth/Logout';
import Callback from 'js/pages/auth/Callback';
import Waiting from 'js/pages/Waiting';

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
          <Route path='/callback'>
            <Callback />
          </Route>
          <PrivateRoute path='/waiting' component={Waiting} />
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};
