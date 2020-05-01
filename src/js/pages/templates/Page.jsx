import React from 'react';

import { useUserContext } from 'js/context/User';
import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';

import Navbar from 'js/components/layout/Navbar';
import Breadcrumbs from 'js/components/layout/Breadcrumbs';
import Footer from 'js/components/layout/Footer';
import Simple from 'js/pages/templates/Simple';

export default ({ invitationDisabled, children }) => {
    const { user, isAuthenticated, logout } = useUserContext();
    const breadcrumbs = useBreadcrumbsContext();

    if (!isAuthenticated) {
        return <NotAuthenticated/>;
    }

    if (!user) {
        return <AuthenticatedWithoutUser logout={logout}/>;
    }

    if (!user.defaultAccount) {
        return <AuthenticatedWithUserNoAccount logout={logout} />;
    }

    return (
        <AuthenticatedWithUser user={user} breadcrumbs={breadcrumbs}
                               invitationDisabled={invitationDisabled}>
          {children}
        </AuthenticatedWithUser>
    );
};


const NotAuthenticated = () => <Navbar />;

const AuthenticatedWithoutUser = ({logout}) => (
    <AuthenticationError
      message="Authentication error. Please logout and use an invitation link."
      logout={logout}
    />
);

const AuthenticatedWithUserNoAccount = ({logout}) => (
    <AuthenticationError
      message="Your user was not invited to any account. You should accept an invitation first."
      logout={logout}
    />
);

const AuthenticatedWithUser = ({user, breadcrumbs, invitationDisabled, children}) => (
    <>
      <Navbar user={user} invitationDisabled={invitationDisabled}/>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="container mt-4">
        {children}
      </div>

      <Footer />
    </>
);

const AuthenticationError = ({message, logout}) => (
    <Simple>
      <p>{message}</p>
      <button onClick={() => logout({ returnTo: window.ENV.auth.logoutRedirectUri })}>logout</button>
    </Simple>
);
