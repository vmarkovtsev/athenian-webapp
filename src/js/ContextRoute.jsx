import React from 'react';
import { Route } from 'react-router-dom';

export default ({ context, children, ...rest }) => {
    const Provider = context;

    return (
        <Route {...rest}>
          <Provider>
            {children}
          </Provider>
        </Route>
    );
};
