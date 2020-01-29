import React from 'react';

import { useAuth0 } from 'js/services/react-auth0-spa';
import Simple from 'js/pages/templates/Simple';

export default () => {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <Simple>Loading...</Simple>;
  }

  return (
    <Simple>
      {!isAuthenticated && "Not authenticated!"}
    </Simple>
  );
};
