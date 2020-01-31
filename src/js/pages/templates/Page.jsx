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
      .then(setUser);
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
