import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from 'js/context/Auth0';

import { getUserWithAccountRepos } from 'js/services/api';
import { analytics } from 'js/analytics';

const UserContext = React.createContext(null);

export const useUserContext = () => useContext(UserContext);

export default ({ children }) => {
    const { logout, loading, isAuthenticated, getTokenSilently } = useAuth0();
    const [userStateLoading, setUserStateLoading] = useState(true);
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        if (loading) {
            return;
        }

        if (!isAuthenticated) {
            setUserStateLoading(false);
            return;
        };

        (async () => {
            try {
                const token = await getTokenSilently();
                const userWithRepos = await getUserWithAccountRepos(token);
                analytics.identify(userWithRepos);
                setUserState(userWithRepos);
            } catch(err) {
                console.error('Could not get user with repos', err);
            } finally {
                setUserStateLoading(false);
            }
        })();
    }, [loading, isAuthenticated, getTokenSilently]);

    if (userStateLoading) {
        return null;
    }

    return (
        <UserContext.Provider value={{user: userState, isAuthenticated, logout}}>
          {children}
        </UserContext.Provider >
    );
};
