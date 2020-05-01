import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';

export default () => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

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
        return <Redirect to={{ pathname: '/' }} />;
    }

    return (
        <Simple>
          <div className="my-5">
            <h2 className="text-dark h4 mb-2">Welcome!</h2>
            <p className="text-secondary">Click to access your Athenian account</p>
          </div>

          <button
            type="button"
            className="btn btn-xlarge btn-orange"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
          <div className="my-5">
            <a className="text-dark-orange" href="https://www.athenian.co">I don’t have an account</a>
          </div>
        </Simple>
    );
};
