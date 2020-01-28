import React from 'react';

import { useAuth0 } from 'js/services/react-auth0-spa';

export default () => {
  const { loading, isAuthenticated, logout } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated!</div>;
  }

  logout({ returnTo: 'http://localhost:3000/' })
  return [];
};
