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
import NotFound404 from 'js/pages/NotFound404';

export default () => {

  return (
    <React.StrictMode>
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login/callback'>
            <Callback />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <PrivateRoute path='/waiting' component={Waiting} />
          <Route path='*'>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};
