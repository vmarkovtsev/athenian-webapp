import React from 'react';

import Navbar from 'js/components/layout/Navbar';
import Breadcrumbs from 'js/components/layout/Breadcrumbs';
import Footer from 'js/components/layout/Footer';
import { useUserContext } from 'js/context/User';

export default ({ breadcrumbs, children }) => {
  const userContext = useUserContext();

  return (
    <>
      <Navbar user={userContext} />
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
