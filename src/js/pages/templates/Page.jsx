import React from 'react';

import { useUserContext } from 'js/context/User';
import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';

import Navbar from 'js/components/layout/Navbar';
import Breadcrumbs from 'js/components/layout/Breadcrumbs';
import Footer from 'js/components/layout/Footer';

export default ({ children }) => {
    const { user } = useUserContext();
    const breadcrumbs = useBreadcrumbsContext();

    return user ? (
        <>
          <Navbar user={user} />
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className="container mt-4">
            {children}
          </div>

          <Footer />
        </>
    ) : <Navbar user={user} /> ;
};
