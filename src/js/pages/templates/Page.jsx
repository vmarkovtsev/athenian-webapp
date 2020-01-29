import React, { useState, useEffect } from 'react';

import Navbar from 'js/components/layout/Navbar';
import Footer from 'js/components/layout/Footer';

import { getUser, fetchApi } from 'js/services/api';
import { useAuth0 } from 'js/services/react-auth0-spa';

export default ({ children }) => {
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

      <div className="container">
        {children}
      </div>

      <Footer />
    </>
  );
};
