import React from 'react';

import logo from '../images/logos/logo-transparent.png';

export default () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 text-center">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-center">
          <button type="button" className="btn btn-primary btn-lg">Login</button>
        </div>
      </div>
    </div>
  );
};
