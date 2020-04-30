import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';
import { FROM_REGISTRATION } from 'js/pages/Waiting';

import { buildApi } from 'js/services/api';
import InvitationLink from 'js/services/api/openapi-client/model/InvitationLink';

export default () => {
    const invitationAcceptRequest = useRef(false);
    const { loading, isAuthenticated, getTokenSilently, logout } = useAuth0();
    const [redirectTo, setRedirectTo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if (loading || !isAuthenticated || invitationAcceptRequest.current) {
            return;
        };

        getTokenSilently()
            .then(async token => {
                const inviteLink = query.get('inviteLink');

                if (!inviteLink) {
                    setRedirectTo({
                        pathname: query.get('targetUrl') || '/',
                    });
                    return;
                }

                try {
                    invitationAcceptRequest.current = true;
                    const check = await acceptInvite(token, inviteLink);
                    setRedirectTo({
                        pathname: check.type === 'admin' ? '/waiting' : '/stage/overview',
                        state: { origin: FROM_REGISTRATION },
                    });
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
            });
    }, [loading, isAuthenticated, getTokenSilently, logout, query]);

    if (errorMessage) {
        return <Simple>{errorMessage}</Simple>;
    }

    if (loading) {
        return <Simple>Loading...</Simple>;
    }

    if (redirectTo?.pathname) {
        return <Redirect to={redirectTo} />;
    }

    return (
        <Simple>
          {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
        </Simple>
    );
};

const acceptInvite = async (token, inviteLink) => {
    const api = buildApi(token);
    const body = new InvitationLink(inviteLink);

    let check;
    try {
        check = await api.checkInvitation(body);
    } catch (err) {
        throw new Error(`Error reading the invitation ${err.error.message}`);
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

    return check;
};
