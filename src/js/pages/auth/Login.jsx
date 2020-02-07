import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useAuth0 } from 'js/services/react-auth0-spa';
import Simple from 'js/pages/templates/Simple';

export default () => {
  const history = useHistory();
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (loading) {
    return <Simple>Loading...</Simple>;
  }

  if (isAuthenticated) {
    if (location.state && location.state.inviteLink) {
      return (
        <Simple>
          You must <Link to="/logout">logout</Link> first, and then open the invitation link.
        </Simple>
      )
    }

    history.push('/');
  }

  const appState = {
    targetUrl: '/waiting',
  };

  if (location.state && location.state.inviteLink) {
    appState.inviteLink = location.state.inviteLink;
  }

  return (
    <Simple>
      {location.state && location.state.inviteLink && (
        <p>Login to accept invitation {appState.inviteLink}</p>
      )}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => loginWithRedirect({ appState: appState })}
      >
        Login
      </button>
    </Simple>
  );
};
