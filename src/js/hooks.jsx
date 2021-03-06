import { useState, useEffect, useRef } from 'react';

import { useAuth0 } from 'js/context/Auth0';
import { useFiltersContext } from 'js/context/Filters';
import { useUserContext } from 'js/context/User';

import { buildApi } from 'js/services/api';

import { isDemo as isDemoMode } from 'js/pages/Demo';

export const useMountEffect = (fun) => useEffect(fun, []);

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const useApiOnly = () => {
    const { loading, isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();
    const [apiState, setApiState] = useState(null);


    useEffect(() => {
        const isDemo = isDemoMode();
        if (!isAuthenticated && !isDemo) {
            return;
        }

        const prepareApi = async () => {
            const token = isDemo ? null : await getTokenSilently();
            const api = buildApi(token);

            setApiState(api);
        };

        prepareApi();
    }, [isAuthenticated, getTokenSilently]);

    return {
        api: apiState,
        ready: !!apiState,
        auth: {
            loading,
            isAuthenticated,
            loginWithRedirect,
            logout
        },
        context: {}
    };
};

const useApiWithUser = () => {
    const {api, auth, ready: apiReady} = useApiOnly();
    const { user } = useUserContext();

    const context = apiReady ? {account: user.defaultAccount.id} : {};
    return {
        api,
        ready: apiReady,
        auth,
        context
    };
};

const useApiWithFilters = () => {
    const {api, auth, ready: apiReady, context: apiContext} = useApiWithUser();
    const {
        ready: filtersReady,
        dateInterval,
        repositories,
        contributors,
        excludeInactive,
    } = useFiltersContext();

    const ready = apiReady && filtersReady;
    const context = {
        ...apiContext,
        interval: dateInterval,
        repositories: repositories,
        contributors: contributors,
        excludeInactive
    };

    return {
        api: api,
        ready,
        auth,
        context
    };
};

export const useApi = (withUser = true, withFilters = true) => getApiHook(withUser, withFilters)();

const getApiHook = (withUser = true, withFilters = true) => {
    if (withFilters) {
        return useApiWithFilters;
    } else if (withUser) {
        return useApiWithUser;
    } else {
        return useApiOnly;
    }
};
