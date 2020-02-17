import React from 'react';

import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';

export default () => {
  const { loading, isAuthenticated, logout } = useAuth0();

  if (loading) {
    return <Simple>Loading...</Simple>;
  }

  if (!isAuthenticated) {
    return (
      <Simple>
        Not authenticated!
      </Simple>
    );
  }

  logout({ returnTo: window.ENV.auth.logoutRedirectUri });
  return [];
};
