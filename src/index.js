import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from 'store';
import Routes from 'routes';

import 'assets/styles/common.scss';

// const basename = '/smk';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>
);

const rootElement = document.getElementById('root');

if (rootElement) {
  render(<App/>, rootElement);
}
