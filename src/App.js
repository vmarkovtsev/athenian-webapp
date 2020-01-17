import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Registration from './pages/Registration';

export default () => {

  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};
