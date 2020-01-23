import React from 'react';
import logo from '../../images/logos/logo-transparent.png';

export default () => {

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <div className="container">
        <a href="/" rel="noopener noreferrer">
          <img src={logo} className="app-logo" alt="athenian" />
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">UserName</span>
              <img className="img-profile rounded-circle" alt="" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#login" data-toggle="modal" data-target="#logoutModal">
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
