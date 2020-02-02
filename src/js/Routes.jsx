import React from 'react';

import {
  Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import history from 'js/services/history';

import PrivateRoute from 'js/PrivateRoute';

import Home from 'js/pages/Home';
import Stage from 'js/pages/pipeline/Stage';
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
          <Route path='/stage/:name'>
            <Stage />
          </Route>
          <Route
            path='/i/:code(\w{8})'
            render={props => (
              <Redirect to={
                {
                  pathname: '/login',
                  state: { inviteLink: window.location.href }
                }
              }/>
            )}
          />
          <Route path='/callback'>
            <Callback />
          </Route>
          <Route path='/login' component={Login} />
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