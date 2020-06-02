import React from 'react';

import { useUserContext } from 'js/context/User';
import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';

import Navbar from 'js/components/layout/Navbar';
import Breadcrumbs from 'js/components/layout/Breadcrumbs';
import Footer from 'js/components/layout/Footer';
import Simple from 'js/pages/templates/Simple';

export default ({ invitationDisabled, children }) => {
    const { user, isAuthenticated, logout, isDemo } = useUserContext();
    const breadcrumbs = useBreadcrumbsContext();

    if (isDemo) {
        return (
            <DemoMode user={user} breadcrumbs={breadcrumbs} >
              {children}
            </DemoMode>
        );
    }

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


const NotAuthenticated = () => (
  <>
    <Navbar />
    <Footer />
  </>
);

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

const AuthenticationError = ({message, logout}) => (
    <Simple>
      <p>{message}</p>

      <button
        type="button"
        className="btn btn-xlarge btn-orange"
        onClick={() => logout({ returnTo: window.ENV.auth.logoutRedirectUri })}
      >
        Logout
      </button>
    </Simple>
);

const NoError = ({user, breadcrumbs, invitationDisabled, isDemo, children}) => (
    <>
      <Navbar user={user} invitationDisabled={invitationDisabled} isDemo={isDemo} />
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="container mt-4">
        {children}
      </div>

      <Footer />
    </>
);

const DemoMode = ({user, breadcrumbs, children}) => (
  <NoError user={user} breadcrumbs={breadcrumbs} invitationDisabled={true} isDemo={true} children={children}/>
);

const AuthenticatedWithUser = ({user, breadcrumbs, invitationDisabled, children}) => (
  <NoError user={user} breadcrumbs={breadcrumbs} invitationDisabled={invitationDisabled} isDemo={false} children={children}/>
);
