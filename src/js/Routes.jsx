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
import UserContext from 'js/context/User';
import Pipeline from 'js/pages/Pipeline';
import Stage from 'js/pages/pipeline/Stage';
import Overview from 'js/pages/pipeline/Overview';
import Login from 'js/pages/auth/Login';
import Logout from 'js/pages/auth/Logout';
import Bearer from 'js/pages/auth/Bearer';
import Callback from 'js/pages/auth/Callback';
import Waiting from 'js/pages/Waiting';
import NotFound404 from 'js/pages/NotFound404';
import Prototypes from 'js/pages/prototypes/Prototypes';

export default () => {

  return (
    <React.StrictMode>
      <Router history={history}>
        <UserContext>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/stage/:name?'>
              <Pipeline>
                <Switch>
                  <Route exact path='/stage'>
                    <Redirect to='/stage/overview' />
                  </Route>
                  <Route exact path='/stage/overview'>
                    <Overview />
                  </Route>
                  <Route path='/stage/:name'>
                    <Stage />
                  </Route>
                </Switch>
              </Pipeline>
            </Route>
            <Route path='/i/:code(\w{8})'>
              <Redirect to={
                {
                  pathname: '/login',
                  state: { inviteLink: window.location.href }
                }
              } />
            </Route>
            <Route path='/callback'>
              <Callback />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/logout'>
              <Logout />
            </Route>
            <Route path='/bearer'>
              <Bearer />
            </Route>
            <PrivateRoute path='/waiting' component={Waiting} />
            <Route path='/prototypes'>
              <Prototypes />
            </Route>
            <Route path='*'>
              <NotFound404 />
            </Route>
          </Switch>
        </UserContext>
      </Router>
    </React.StrictMode>
  );
};
