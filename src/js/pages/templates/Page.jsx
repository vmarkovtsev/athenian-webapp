import React from 'react';

import { useUserContext } from 'js/context/User';
import BreadcrumbsContext from 'js/context/Breadcrumbs';
import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';

import Navbar from 'js/components/layout/Navbar';
import Breadcrumbs from 'js/components/layout/Breadcrumbs';
import Footer from 'js/components/layout/Footer';

export default ({ children }) => {
  const userContext = useUserContext();
  const breadcrumbs = useBreadcrumbsContext();

  return (
    <BreadcrumbsContext>
      <Navbar user={userContext} />
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="container mt-4">
        {children}
      </div>

      <Footer />
    </BreadcrumbsContext>
  );
};
