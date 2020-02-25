import React, {useState} from 'react';

import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';

export default () => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();

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
  
  const [token, setToken] = useState("");
  (async () => setToken(await getTokenSilently()))();

  return <Simple><pre class="bearer-token">{token}</pre></Simple>;
};
