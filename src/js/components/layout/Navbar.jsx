import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import logo from 'images/logos/logo-transparent.png';
import defaultImage from 'images/default-user-image.png';

import InvitationCreator from 'js/smart-components/InvitationCreator';

export default ({ user }) => (
  <div className="navbar navbar-expand-sm navbar-light bg-white topbar static-top border-bottom">
    <div className="container d-flex justify-content-between align-items-center">
      <Link to="/">
        <img src={logo} className="app-logo" alt="athenian" />
      </Link>
      <User user={user} />
    </div>
  </div>
);

const User = ({ user }) => {

  return user ? (
    <ul className="navbar-nav ml-auto pr-0">
      <li className="nav-item dropdown no-arrow">
        <span className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img className="img-profile rounded-circle cursor-pointer" alt="" src={user.picture || defaultImage} />
        </span>
        <form className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <header className="menuItem d-flex flex-row align-items-center bg-light py-2 border-bottom">
            <img className="img-profile rounded-circle" alt="" src={user.picture || defaultImage} />
            <div className="userData">
              <p className="mb-1 text-truncate font-weight-bold text-gray-900">{user.name}</p>
              <p className="mb-0 text-truncate">{user.email}</p>
            </div>
          </header>
          <InvitationCreator user={user} className="menuItem py-3" />
          <footer className="menuItem d-flex flex-row align-items-center justify-content-end bg-light py-2 text-xs border-top">
            <Link to="/logout">Logout</Link>
          </footer>
        </form>
      </li>
    </ul>
  ) : (
      <span className="navbar-nav ml-auto">
        <Link to="/login">
          <FontAwesomeIcon icon={faSignInAlt} className="ml-2 text-secondary mr-2 text-gray-400" />
          Login
      </Link>
      </span>
    )
};
