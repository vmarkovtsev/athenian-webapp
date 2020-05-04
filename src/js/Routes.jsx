import React, {useEffect} from 'react';

import {
    Switch,
    Route,
    Redirect,
    useLocation,
} from 'react-router-dom';

import { analytics } from 'js/analytics';

import ContextRoute from 'js/ContextRoute';

import Home from 'js/pages/Home';
import UserContext from 'js/context/User';
import Pipeline from 'js/pages/Pipeline';
import Stage from 'js/pages/pipeline/Stage';
import Overview from 'js/pages/pipeline/Overview';
import Login from 'js/pages/auth/Login';
import SignUp from 'js/pages/auth/SignUp';
import Logout from 'js/pages/auth/Logout';
import Development from 'js/components/development';
import Callback from 'js/pages/auth/Callback';
import Waiting from 'js/pages/Waiting';
import NotFound404 from 'js/pages/NotFound404';
import Settings from 'js/pages/Settings';
import SettingsProfile from 'js/pages/settings/Profile';
import SettingsTeam from 'js/pages/settings/Team';
import SettingsReleases from 'js/pages/settings/Releases';

import Prototypes from 'js/pages/prototypes';
import Charts from 'js/pages/prototypes/Charts';
import MetricGroups from 'js/pages/prototypes/MetricGroups';
import Tooltips from 'js/pages/prototypes/Tooltips';
import EmptyStates from 'js/pages/prototypes/EmptyStates';
import WaitingProto from 'js/pages/prototypes/Waiting';

export default () => {
    const location = useLocation();

    useEffect(() => {
        analytics.page();
    }, [location]);

    return (
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
                    pathname: '/signup',
                    state: { inviteLink: window.location.href }
                }
            } />
          </Route>

          <Route path='/callback'>
            <Callback />
          </Route>

          <Route path='/signup'>
            <SignUp />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <ContextRoute context={UserContext} path='/logout'>
            <Logout />
          </ContextRoute>

          <ContextRoute context={UserContext} path='/settings/:name?'>
            <Settings>
              <Switch>
                <Route exact path='/settings'>
                  <Redirect to='/settings/profile' />
                </Route>
                <Route exact path='/settings/profile'>
                  <SettingsProfile />
                </Route>
                <Route exact path='/settings/teams'>
                  <SettingsTeam />
                </Route>
                <Route exact path='/settings/releases'>
                  <SettingsReleases />
                </Route>
              </Switch>
            </Settings>
          </ContextRoute>

          <Route path='/bearer'><Development.Bearer /></Route>

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
            }} />
          </ContextRoute>

          <Route path='*'>
            <NotFound404 />
          </Route>

        </Switch>
    );
};
