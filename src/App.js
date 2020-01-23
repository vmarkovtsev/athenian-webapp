import React from 'react';

import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';

import history from './utils/history';

import PrivateRoute from "./components/PrivateRoute";

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Callback from './pages/Callback';
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
