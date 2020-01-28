import React, { useState, useEffect } from 'react';

import Navbar from 'js/components/layout/Navbar';
import Footer from 'js/components/layout/Footer';

import { getUser } from 'js/services/api';
import { useAuth0 } from 'js/services/react-auth0-spa';

export default ({ children }) => {
  const [userState, setUser] = useState(null);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getUser().then(setUser);
    }
  }, []);

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
