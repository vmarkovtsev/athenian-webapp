import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

import { getUser } from '../../services/api';

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
