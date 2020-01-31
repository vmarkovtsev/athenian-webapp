import React, { useState, useEffect } from 'react';

import Navbar from 'js/components/layout/Navbar';
import Breadcrumbs from 'js/components/layout/Breadcrumbs';
import Footer from 'js/components/layout/Footer';

import { getUser, fetchApi } from 'js/services/api';
import { useAuth0 } from 'js/services/react-auth0-spa';

export default ({ breadcrumbs, children }) => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  const [userState, setUser] = useState(null);

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    };

    getTokenSilently()
      .then(token => fetchApi(token, getUser))
      .then(setUser)
      .catch(e => setUser({})); // TODO (dpordomingo):
    // if could not get the user, but Auth0 is in logged in state, it will set an empty user
    // We'll handle errors later, but this is blocker to ensure that at least the user can logout.
  }, [loading, isAuthenticated, getTokenSilently]);;

  return (
    <>
      <Navbar user={userState} />
      {breadcrumbs && (
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      )}

      <div className="container mt-4">
        {children}
      </div>

      <Footer />
    </>
  );
};
