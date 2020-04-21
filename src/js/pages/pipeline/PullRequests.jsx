import React, { useState, useEffect } from 'react';

import PRsContext from 'js/context/PRs';
import { useApi } from 'js/hooks';
import { useDataContext } from 'js/context/Data';
import { getPRs } from 'js/services/api';

export default ({ children }) => {
    const { api, ready: apiReady, context: apiContext } = useApi();
    const { setGlobal: setGlobalData } = useDataContext();
    const [prsState, setPrsState] = useState({ prs: [], users: {} });

    useEffect(() => {
        if (!apiReady) {
            console.log("api not ready");
            return;
        };

        const getAndSetPRs = async () => {
            try {
                const prs = await getPRs(api, apiContext.account, apiContext.interval,
                                         apiContext.repositories, apiContext.contributors);
                setGlobalData('prs', prs);
                setPrsState(prs);
            } catch (err) {
                console.error('Could not get pull requests', err);
            }
        };

        getAndSetPRs();
    }, [apiReady, api, apiContext.account, apiContext.interval, apiContext.repositories, apiContext.contributors, setGlobalData]);

    return (
        <PRsContext prs={prsState}>
            {children}
        </PRsContext>
    );
};
