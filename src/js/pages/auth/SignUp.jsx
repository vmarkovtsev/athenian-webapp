import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';

export default () => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
    const location = useLocation();
    const inviteLink = location.state?.inviteLink;

    if (!inviteLink) {
        return <NoInvitation/>;
    }

    if (loading) {
        return (
            <Simple>
              <div className="my-5">
                <p className="text-secondary">Loading...</p>
              </div>
            </Simple>
        );
    }

    if (isAuthenticated) {
        return (
                <Simple>
                  <div className="my-5">
                    <p className="text-secondary">You must <Link to="/logout">logout</Link> first, and then open the invitation link.</p>
                  </div>
                </Simple>
        );
    }

    return (
        <Simple>
          <div className="my-5">
            <p className="text-secondary">Sign up to accept invitation {inviteLink}</p>
          </div>

          <div className="my-5">
            <h2 className="text-dark h4 mb-2">Welcome!</h2>
            <p className="text-secondary">Click to create your Athenian account</p>
          </div>

          <button
            type="button"
            className="btn btn-xlarge btn-orange"
            onClick={() => loginWithRedirect({ appState: { inviteLink } })}
          >
            Sign Up
          </button>
        </Simple>
    );
};

const NoInvitation = () => (
    <Simple>
      <div className="my-5">
        <h2 className="text-dark h4 mb-2">Welcome!</h2>
        <p className="text-secondary">You need an invitation link to create your Athenian account</p>
      </div>

      <div className="my-5">
        <a className="text-dark-orange" href="https://www.athenian.co">I don’t have an account</a>
      </div>
    </Simple>
);
