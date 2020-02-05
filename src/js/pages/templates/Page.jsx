import React, { useState } from 'react';

import { useUserContext } from 'js/context/User';
import BreadcrumbsContext from 'js/context/Breadcrumbs';

import Navbar from 'js/components/layout/Navbar';
import Breadcrumbs from 'js/components/layout/Breadcrumbs';
import Footer from 'js/components/layout/Footer';

export default ({ children }) => {
  const userContext = useUserContext();
  const [breadcrumbsState, setBreadcrumbsState] = useState(null);

  return (
    <BreadcrumbsContext setBreadcrumbsFn={setBreadcrumbsState}>
      <Navbar user={userContext} />
      <Breadcrumbs breadcrumbs={breadcrumbsState} />

      <div className="container mt-4">
        {children}
      </div>

      <Footer />
    </BreadcrumbsContext>
  );
};
