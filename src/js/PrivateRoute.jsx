import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from 'js/services/react-auth0-spa';

export default ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props => {
    return isAuthenticated === true ? <Component {...props} /> : null;
  };


  return <Route path={path} render={render} {...rest} />;
};
