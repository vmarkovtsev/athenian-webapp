import React, { useState, useEffect } from 'react';

import logo from '../images/logos/logo-transparent.png';

import Pipeline from '../components/pipeline/Pipeline';

import { getPipelineDataInitial, getPipelineDataAPI, getUser } from '../services/api';

export default () => {
  const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
  const [userState, setUser] = useState(null);

  useEffect(() => {
    getPipelineDataAPI().then(data => {
      setPipelineData(data);
    });
  }, []);

  useEffect(() => {
    getUser().then(data => setUser(data));
  }, []);

  return <>
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <div className="container">
        <a
          href="/"
          rel="noopener noreferrer"
        >
          <img src={logo} className="app-logo" alt="athenian" />
        </a>
        <User user={userState} />
      </div>
    </nav>,

    <div className="container">
      <Pipeline pipeline={pipelineState} />
    </div>,

    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; Athenian.co 2020</span>
        </div>
      </div>
    </footer>
  </>;
};

const User = ({ user }) => user ? (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.name}</span>
        <img className="img-profile rounded-circle" alt="" src={user.picture} />
      </a>
      <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
        <a className="dropdown-item" href="#login" data-toggle="modal" data-target="#logoutModal">
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  </ul>
) : (
    <span className="navbar-nav ml-auto">Login</span>
  );
