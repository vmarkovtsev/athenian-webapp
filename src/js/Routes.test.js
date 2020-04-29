import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Routes from 'js/Routes';

import {
    Router,
} from 'react-router-dom';

import history from 'js/services/history';
import * as Auth0 from 'js/context/Auth0';

it('renders without crashing', () => {

    jest
        .spyOn(Auth0, 'useAuth0')
        .mockImplementation(() => ({}));

    window.ENV = { api: {}, environment: 'development'};

    const div = document.createElement('div');
    act(() => {
        ReactDOM.render(<>
        <Router history={history}>
          <Routes />
        </Router>
      </>, div);
    });

    ReactDOM.unmountComponentAtNode(div);
});
