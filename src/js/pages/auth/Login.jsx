import React from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';

import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';

export default () => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const inviteLink = location.state?.inviteLink;

  if (loading) {
    return <Simple>
        <div className="my-5">
            <p className="text-secondary">Loading...</p>
        </div>
    </Simple>;
  }

  if (isAuthenticated) {
    return inviteLink ?
      (
        <Simple>
            <div className="my-5">
                <p className="text-secondary">You must <Link to="/logout">logout</Link> first, and then open the invitation link.</p>
            </div>
        </Simple>
      ) : (
        <Redirect to={{ pathname: '/' }} />
      );
  }

  return (
    <Simple>
      {inviteLink && (
          <div className="my-5">
            <p className="text-secondary">Login to accept invitation {inviteLink}</p>
          </div>
      )}
      <div className="my-5">
          <h2 className="text-dark h4 mb-2">Welcome!</h2>
          <p className="text-secondary">Click to access your Athenian account</p>
      </div>

      <button
        type="button"
        className="btn btn-xlarge btn-orange"
        onClick={() => loginWithRedirect({ appState: { inviteLink } })}
      >
        Login
      </button>
      <div className="my-5">
        <a className="text-dark-orange" href="https://www.athenian.co">I don’t have an account</a>
      </div>
    </Simple>
  );
};
