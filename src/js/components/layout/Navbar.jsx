import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import logo from 'images/logos/logo-transparent.svg';
import defaultImage from 'images/default-user-image.png';

import InvitationCreator from 'js/smart-components/InvitationCreator';

export default ({ user, invitationDisabled, isDemo }) => (
  <div className="navbar navbar-expand-sm navbar-light bg-white topbar static-top border-bottom">
    <div className="container d-flex justify-content-between align-items-center">
      <Link to="/">
        <img src={logo} className="app-logo" alt="athenian" />
      </Link>
      <User user={user} invitationDisabled={invitationDisabled} isDemo={isDemo} />
    </div>
  </div>
);

const User = ({ user, invitationDisabled, isDemo }) => {

  return user && !isDemo ? (
    <ul className="navbar-nav ml-auto pr-0">
      <li className="nav-item dropdown no-arrow">
        <span className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img className="img-profile rounded-circle cursor-pointer" alt="" src={user.picture || defaultImage} />
        </span>
        <form className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <header className="menuItem d-flex flex-row align-items-center bg-light py-2 border-bottom">
            <img className="img-profile rounded-circle" alt="" src={user.picture || defaultImage} />
            <div className="userData">
              <p className="mb-0 text-truncate text-dark">{user.name}</p>
              <p className="mb-0 text-truncate font-weight-light text-s">{user.email}</p>
            </div>
          </header>
          {!invitationDisabled && <InvitationCreator user={user} className="menuItem py-3" />}
          <div className="d-flex flex-row d-flex justify-content-between align-items-center font-weight-light text-s menuItem py-3 border-top">
            <Link to="/settings" className="text-dark">Settings</Link>
          </div>
          <footer className="menuItem d-flex flex-row align-items-center justify-content-end bg-light py-2 text-xs border-top">
            <Link to="/logout" className="text-s text-secondary">Logout</Link>
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
