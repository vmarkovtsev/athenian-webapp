import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import CopyButton from 'js/components/ui/CopyButton';

import { useAuth0 } from 'js/context/Auth0';
import { getInvitation } from 'js/services/api';

export default ({ user, className }) => {
    const { getTokenSilently } = useAuth0();

    const [urlState, setUrlState] = useState('');
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        setUrlState('');
        if (!user) {
            return;
        };

        if (!user.defaultAccount.isAdmin) {
            return;
        }

        setLoadingState(true);
        getTokenSilently()
            .then(token => getInvitation(token, user.defaultAccount.id))
            .then(setUrlState)
            .catch(err => console.error("Could not get invitation", err))
            .finally(() => setLoadingState(false));
    }, [user, getTokenSilently]);

    return (
        loadingState ? (
            <div className={classnames('invitationCreator d-flex flex-row d-flex justify-content-between align-items-center text-xs', className)}>
                loading...
            </div>
        ) : (
                urlState && (
                    <div className={classnames('invitationCreator d-flex flex-row d-flex justify-content-between align-items-center font-weight-light text-s', className)}>
                        <div className="desc">
                            <p className="my-0 text-truncate text-dark">Invite</p>
                            <p className="my-0 text-truncate">{urlState}</p>
                        </div>

                        <CopyButton content={urlState} />
                    </div>
                )
            )
    );
};
