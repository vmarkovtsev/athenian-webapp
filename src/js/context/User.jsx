import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from 'js/services/react-auth0-spa';

import Simple from 'js/pages/templates/Simple';

import { getUserWithAccountRepos } from 'js/services/api';

const UserContext = React.createContext(null);

export const useUserContext = () => useContext(UserContext);

export default ({ children }) => {
    const { logout, loading, isAuthenticated, getTokenSilently } = useAuth0();
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        if (loading) {
            return;
        };

        if (!isAuthenticated) {
            setUserState(null);
            return;
        };

        getTokenSilently()
            .then(getUserWithAccountRepos)
            .then(setUserState)
            .catch(err => console.error('Could not get user with repos', err));

    }, [loading, isAuthenticated, getTokenSilently]);

    return (
        <UserContext.Provider value={userState}>
            {
                userState && !userState.defaultAccount ? (
                    <Simple>
                        <p>Your user was not invited to any account. You should accept an invitation first.</p>
                        <button onClick={() => logout({ returnTo: window.ENV.auth.logoutRedirectUri })}>logout</button>
                    </Simple>
                ) : (
                        children
                    )
            }
        </UserContext.Provider >
    );
};
