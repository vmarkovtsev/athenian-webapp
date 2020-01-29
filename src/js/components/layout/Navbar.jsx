import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import logo from 'images/logos/logo-transparent.png';

export default ({ user }) => (
  <>
    <div className="navbar navbar-expand-sm navbar-light bg-white topbar static-top border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src={logo} className="app-logo" alt="athenian" />
        </Link>
        <User user={user} />
      </div>
    </div>
    <div className="navbar navbar-expand-sm navbar-light bg-white static-top border-bottom mb-4">
      <div className="container">
        <ol id="mainBreadcrumbs" className="breadcrumb bg-white mb-0 py-0 p-0" aria-label="breadcrumb">
          <li className="breadcrumb-item text-xs"><Link to="/" className="text-secondary">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Work in progress</li>
        </ol>
      </div>
    </div>
  </>
);

const User = ({ user }) => user ? (
  <ul className="navbar-nav ml-auto pr-0">
    <li className="nav-item dropdown no-arrow">
      <span className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="mr-2 d-inline text-gray-600 small">{user.name}</span>
        <img className="img-profile rounded-circle" alt="" src={user.picture} />
      </span>
      <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
        <Link className="dropdown-item" to="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} className="ml-2 text-secondary mr-2 text-gray-400" />
          Logout
        </Link>
      </div>
    </li>
  </ul>
) : (
    <span className="navbar-nav ml-auto">
      <Link to="/login">
        <FontAwesomeIcon icon={faSignInAlt} className="ml-2 text-secondary mr-2 text-gray-400" />
        Login
      </Link>
    </span>
  );
