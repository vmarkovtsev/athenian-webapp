import React from 'react';

import logo from '../images/logos/logo-transparent.png';

import { useHistory } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

export default () => {
  const history = useHistory();
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    history.push("/");
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 text-center">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-center">
          <button type="button" onClick={() => loginWithRedirect({})} className="btn btn-primary btn-lg">Login</button>
        </div>
      </div>
    </div>
  );
};
