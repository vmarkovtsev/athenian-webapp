import React, { useEffect, useReducer, useContext } from 'react';
import { useAuth0 } from 'js/context/Auth0';

import { getUserWithAccountRepos } from 'js/services/api';
import { analytics } from 'js/analytics';

const UserContext = React.createContext(null);

export const useUserContext = () => useContext(UserContext);

const initialState = {loading: true};
const reducer = (state, action) => {
    switch (action.type) {
    case 'set':
        const state = {loading: false};
        const { user, userWithRepos } = action;
        const godMode = userWithRepos ? user.sub !== userWithRepos.id : false;
        return {...state, user: userWithRepos, godMode};
    case 'fail':
        return {loading: false};
    default:
        throw new Error();
    }
};

export default ({ children }) => {
    const { logout, user, loading, isAuthenticated, getTokenSilently } = useAuth0();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (loading) {
            return;
        }

        if (!isAuthenticated) {
            dispatch({type: 'fail'});
            return;
        };

        (async () => {
            try {
                const token = await getTokenSilently();
                const userWithRepos = await getUserWithAccountRepos(token);
                dispatch({type: 'set', user, userWithRepos});
            } catch(err) {
                console.error('Could not get user with repos', err);
                dispatch({type: 'fail'});
            }
        })();
    }, [loading, isAuthenticated, getTokenSilently, user]);

    if (state.loading) {
        return null;
    }

    if (!state.godMode) {
        analytics.identify(state.user);
    }

    return (
        <UserContext.Provider value={{user: state.user, isAuthenticated, logout}}>
          {children}
        </UserContext.Provider >
    );
};
