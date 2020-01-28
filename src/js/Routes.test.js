import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Routes from 'js/Routes';

import * as Auth0 from 'js/services/react-auth0-spa';

it('renders without crashing', () => {

  jest
    .spyOn(Auth0, 'useAuth0')
    .mockImplementation(() => ({}))


  const div = document.createElement('div');
  act(() => {
    ReactDOM.render(<Routes />, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});
