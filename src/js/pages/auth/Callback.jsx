import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import Simple from 'js/pages/templates/Simple';
import { FROM_REGISTRATION } from 'js/pages/Waiting';

import { useApi } from 'js/hooks';
import InvitationLink from 'js/services/api/openapi-client/model/InvitationLink';

export default () => {
    const {api, ready: apiReady, auth} = useApi(false, false);

    const invitationAcceptRequest = useRef(false);
    const [redirectTo, setRedirectTo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if (!apiReady || invitationAcceptRequest.current) {
            return;
        };

        invitationAcceptRequest.current = true;

        (async () => {
            const inviteLink = query.get('inviteLink');

            if (!inviteLink) {
                setRedirectTo({
                    pathname: query.get('targetUrl') || '/',
                });
                return;
            }

            try {
                const check = await acceptInvite(api, inviteLink);
                setRedirectTo({
                    pathname: check.type === 'admin' ? '/waiting' : '/stage/overview',
                    state: { origin: FROM_REGISTRATION },
                });
            } catch (err) {
                setErrorMessage(err.message);
                window.setTimeout(() => setRedirectTo({pathname: '/'}), 3000);
            }
        })();
    }, [apiReady, api, auth.logout, query, auth]);

    if (auth.loading) {
        return <Simple>Loading...</Simple>;
    }

    if (redirectTo?.pathname) {
        return <Redirect to={redirectTo} />;
    }

    if (errorMessage) {
        return (
            <Simple linkToHome={false}>
              <div>
                <div>An error occurred while accepting the invitation:
                  <span className="mt-3" style={{display: "block", fontStyle: "italic"}}>{errorMessage}</span>
                </div>
                <div className="mt-5">You'll be redirected to the home page.</div>
              </div>
            </Simple>
        );
    }

    return (
        <Simple>
          {auth.isAuthenticated ? 'Authenticated' : 'Not authenticated'}
        </Simple>
    );
};

const acceptInvite = async (api, inviteLink) => {
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
