import React from 'react';

import {
    Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import history from 'js/services/history';

import ContextRoute from 'js/ContextRoute';

import Home from 'js/pages/Home';
import UserContext from 'js/context/User';
import Pipeline from 'js/pages/Pipeline';
import Stage from 'js/pages/pipeline/Stage';
import Overview from 'js/pages/pipeline/Overview';
import Login from 'js/pages/auth/Login';
import Logout from 'js/pages/auth/Logout';
import Development from 'js/components/development';
import Callback from 'js/pages/auth/Callback';
import Waiting from 'js/pages/Waiting';
import NotFound404 from 'js/pages/NotFound404';
import Settings from './pages/Settings';

import Prototypes from 'js/pages/prototypes';
import Charts from 'js/pages/prototypes/Charts';
import MetricGroups from 'js/pages/prototypes/MetricGroups';
import Tooltips from 'js/pages/prototypes/Tooltips';
import EmptyStates from 'js/pages/prototypes/EmptyStates';
import WaitingProto from 'js/pages/prototypes/Waiting';
import SettingsProto from 'js/pages/prototypes/Settings';

export default () => {

    const devmode = (
        process.env.NODE_ENV === 'development' ||
            ['development', 'staging'].includes(window.ENV.environment)
    );

    return (
        <React.StrictMode>
          <Router history={history}>
            <Switch>

              <ContextRoute context={UserContext} exact path='/'>
                <Home />
              </ContextRoute>

              <ContextRoute context={UserContext} path='/stage/:name?'>
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
              </ContextRoute>

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

              <ContextRoute context={UserContext} path='/logout'>
                <Logout />
              </ContextRoute>

              <ContextRoute context={UserContext} path='/settings'>
                <Settings />
              </ContextRoute>

              {devmode && <Route path='/bearer'><Development.Bearer /></Route>}

              <ContextRoute context={UserContext} path='/waiting'>
                <Waiting />
              </ContextRoute>

              <ContextRoute context={UserContext} path='/prototypes/:name?'>
                <Prototypes prototypes={{
                    'charts': <Charts />,
                    'metrics-groups': <MetricGroups />,
                    'tooltips': <Tooltips />,
                    'empty-states': <EmptyStates />,
                    'waiting': <WaitingProto />,
                    'settings': <SettingsProto />,
                }} />
              </ContextRoute>

              <Route path='*'>
                <NotFound404 />
              </Route>

            </Switch>
          </Router>
        </React.StrictMode>
    );
};
