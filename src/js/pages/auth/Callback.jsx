import React, { useEffect, useState } from 'react';

import { useLocation, Redirect } from 'react-router-dom';

import { useAuth0 } from 'js/services/react-auth0-spa';
import Simple from 'js/pages/templates/Simple';

import { buildApi } from 'js/services/api';
import InvitationLink from 'js/services/api/openapi-client/model/InvitationLink';

export default () => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  const [redirectTo, setRedirectTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    };

    getTokenSilently()
      .then(token => {
        const api = buildApi(token);
        const inviteLink = query.get('inviteLink');

        if (inviteLink) {
          const body = new InvitationLink(inviteLink);
          api.checkInvitation(body)
            .then(check => {
              if (check.valid && check.active) {
                const invType = check.type;
                return api.acceptInvitation(body);
              }

              return Promise.reject(new Error('invalid invitation'));
            })
            .then(resp => setRedirectTo(query.get('targetUrl')))
            .catch(err => setErrorMessage(err.message));
        } else {
          setRedirectTo(query.get('targetUrl'));
        }
      });
  }, [loading, isAuthenticated]);;

  if (redirectTo) {
    return <Redirect to={redirectTo}/>;
  }

  if (errorMessage) {
    return <Simple>{errorMessage}</Simple>;
  }

  if (loading) {
    return <Simple>Loading...</Simple>;
  }

  return (
    <Simple>
      {!isAuthenticated && "Not authenticated!"}
    </Simple>
  );
};
