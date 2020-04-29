import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from 'js/context/Auth0';

import Simple from 'js/pages/templates/Simple';

import { getUserWithAccountRepos } from 'js/services/api';
import { analytics } from 'js/analytics';

const UserContext = React.createContext(null);

export const useUserContext = () => useContext(UserContext);

export default ({ children }) => {
    const { logout, loading, isAuthenticated, getTokenSilently } = useAuth0();
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
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
            }
        })();
    }, [isAuthenticated, getTokenSilently]);

    if (loading) {
        return null;
    }

    return (
        <UserContext.Provider value={userState}>
          {
              userState && !userState.defaultAccount ? (
                  <Simple>
                    <p>Your user was not invited to any account. You should accept an invitation first.</p>
                    <button onClick={() => logout({ returnTo: window.ENV.auth.logoutRedirectUri })}>logout</button>
                  </Simple>
              ) : (
                  <>
                    {children}
                  </>

              )
          }
        </UserContext.Provider >
    );
};
