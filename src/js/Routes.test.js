import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Routes from 'js/Routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  act(() => {
    ReactDOM.render(<Routes />, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});
