import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import { useAuth0 } from 'js/services/react-auth0-spa';
import Simple from 'js/pages/templates/Simple';

import { buildApi } from 'js/services/api';
import InvitationLink from 'js/services/api/openapi-client/model/InvitationLink';

export default () => {
  const { loading, isAuthenticated, getTokenSilently, logout } = useAuth0();
  const [redirectTo, setRedirectTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    };

    getTokenSilently()
      .then(async (token) => {
        const api = buildApi(token);
        const inviteLink = query.get('inviteLink');

        if (inviteLink) {
          const body = new InvitationLink(inviteLink);

          try {

            let check;
            try {
              check = await api.checkInvitation(body);
            } catch (err) {
              throw new Error(`${err.error.message}`);
            }

            if (!check.valid || !check.active) {
              const cause = !check.valid ? 'valid' : 'active';
              throw new Error(`Invitation is not ${cause}`);
            }

            try {
              await api.acceptInvitation(body);
            } catch (err) {
              throw new Error(`Could not accept the invitation. Err#${err.body.status} ${err.body.type}. ${err.body.detail}`);
            }

          } catch (err) {
            setErrorMessage(err.message);

            // TODO (dpordomingo):
            // This is needed because if the invitation fails, the user should not be logged in.
            // Also, the logout is delayed because Auth0 redirects to the 'logoutRedirectUri'
            // inmediately, and then the user would not be able to see the error message.
            // Workaround: store the error, let Auth0 to redirect, and then show the stored message.
            window.setTimeout(() => logout({ returnTo: window.ENV.auth.logoutRedirectUri }), 3000);
            return;
          }
        }

        setRedirectTo(query.get('targetUrl'));
      });
  }, [loading, isAuthenticated]);;

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
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
