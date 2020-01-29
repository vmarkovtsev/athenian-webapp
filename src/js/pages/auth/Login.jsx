import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth0 } from 'js/services/react-auth0-spa';
import Simple from 'js/pages/templates/Simple';

export default () => {
  const history = useHistory();
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (loading) {
    return <Simple>Loading...</Simple>;
  }

  if (isAuthenticated) {
    history.push('/');
  }

  return (
    <Simple>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={
          () => loginWithRedirect({
            appState: { targetUrl: "/waiting" }
          })
        }
      >
        Login
      </button>
    </Simple>
  );
};
