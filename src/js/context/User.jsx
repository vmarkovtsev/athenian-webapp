import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from 'js/context/Auth0';

import Simple from 'js/pages/templates/Simple';

import { getUserWithAccountRepos } from 'js/services/api';
import { useMountEffect } from 'js/hooks';
import { analytics } from 'js/analytics';
import _ from 'lodash';

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
                    {userState && <Intercom user={userState} />}
                    {children}
                  </>

              )
          }
        </UserContext.Provider >
    );
};


const Intercom = ({user}) => {
    useMountEffect(() => {
        if (window.ENV.intercom.appId) {
            const githubOrgs = _(user.defaultReposet.repos)
                  .map(r => r.split('/')[1])
                  .uniq()
                  .value();
            window.Intercom('boot', {
                app_id: window.ENV.intercom.appId,
                user_id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                updated: parseInt(user.updated.getTime() / 1000),
                "Is Admin": user.defaultAccount.isAdmin,
                "Github Organizations": githubOrgs,
            });
        }
    });

    return null;
};
