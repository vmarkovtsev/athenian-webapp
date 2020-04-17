import React from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';

import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';

export default () => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const inviteLink = location.state?.inviteLink;

  if (loading) {
    return <Simple>Loading...</Simple>;
  }

  if (isAuthenticated) {
    return inviteLink ?
      (
        <Simple>
          You must <Link to="/logout">logout</Link> first, and then open the invitation link.
        </Simple>
      ) : (
        <Redirect to={{ pathname: '/' }} />
      );
  }

  return (
    <Simple>
      {inviteLink && (
        <p>Login to accept invitation {inviteLink}</p>
      )}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => loginWithRedirect({ appState: { inviteLink } })}
      >
        Login
      </button>
    </Simple>
  );
};
