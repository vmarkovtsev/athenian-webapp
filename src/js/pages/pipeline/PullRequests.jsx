import React, { useState, useEffect } from 'react';

import PRsContext from 'js/context/PRs';
import { useApi } from 'js/hooks';

import { getPRs } from 'js/services/api';

export default ({ children }) => {
    const { api, ready: apiReady, context: apiContext } = useApi();
    const [prsState, setPrsState] = useState({
        prev: { prs: [], users: {} },
        curr: { prs: [], users: {} },
    });

    useEffect(() => {
        if (!apiReady) {
            console.log("api not ready");
            return;
        };

        const getAndSetPRs = async () => {
            try {
                const prs = await getPRs(api, apiContext.account, apiContext.interval,
                                         apiContext.repositories, apiContext.contributors);
                setPrsState(prs);
            } catch (err) {
                console.error('Could not get pull requests', err);
            }
        };

        getAndSetPRs();
    }, [apiReady, api, apiContext.account, apiContext.interval, apiContext.repositories, apiContext.contributors]);

    return (
        <PRsContext prevPRs={prsState.prev} currPRs={prsState.curr}>
            {children}
        </PRsContext>
    );
};
