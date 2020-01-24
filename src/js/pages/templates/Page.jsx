import React, { useState, useEffect } from 'react';

import Navbar from 'js/components/layout/Navbar';
import Footer from 'js/components/layout/Footer';

import { getUser } from 'js/services/api';

export default ({ children }) => {
  const [userState, setUser] = useState(null);

  useEffect(() => {
    getUser().then(setUser);
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
