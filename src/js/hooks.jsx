import { useState, useEffect, useRef } from 'react';

import { useAuth0 } from 'js/context/Auth0';
import { useFiltersContext } from 'js/context/Filters';
import { useUserContext } from 'js/context/User';

import { buildApi } from 'js/services/api';

export const useMountEffect = (fun) => useEffect(fun, []);

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export const useApi = (noUsers = false, noFilters = false) => {
    if (noUsers) {
        noFilters = true;
    }

    const { getTokenSilently } = useAuth0();
    const {
        ready: filtersReady,
        dateInterval,
        repositories,
        contributors
    } = useFiltersContext();
    const userContext = useUserContext();

    const [apiState, setApiState] = useState(null);
    const [apiReadyState, setApiStateReady] = useState(false);

    useMountEffect(() => {
        const prepareApi = async () => {
            const token = await getTokenSilently();
            const api = buildApi(token);

            setApiState(api);
            setApiStateReady(true);
        };

        prepareApi();
    });

    let context = {};
    let ready = apiReadyState;

    if (!noUsers) {
        context = {...context, account: userContext.defaultAccount.id};
    }

    if (!noFilters) {
        ready &= filtersReady;
        context = {
            ...context,
            interval: dateInterval,
            repositories: repositories,
            contributors: contributors
        };
    }

    context = ready ? context : {};
    return {
        api: apiState,
        ready,
        context
    };
};
