import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import history from "./utils/history";

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';

export default () => {

  return (
    <React.StrictMode>
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};
