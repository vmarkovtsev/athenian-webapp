import React, { useState, useEffect } from 'react';

import PRsContext from 'js/context/PRs';
import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useFiltersContext } from 'js/context/Filters';

import { getPRs } from 'js/services/api';

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext(null);
    const { dateInterval, repositories, contributors } = useFiltersContext();
    const [prsState, setPrsState] = useState({ prs: [], users: {} });

    useEffect(() => {
        if (!userContext || !repositories.length) {
            return;
        };

        getTokenSilently()
            .then(token => getPRs(token, userContext.defaultAccount.id, dateInterval, repositories, contributors))
            .then(setPrsState)
            .catch(err => console.error('Could not get pull requests', err));

    }, [userContext, dateInterval, repositories, contributors, getTokenSilently]);

    return (
        <PRsContext prs={prsState}>
            {children}
        </PRsContext>
    )
};
