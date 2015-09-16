import 'babel/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './containers/App';
import rootReducer from './reducers/reducer';

let store = createStore(rootReducer);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('content')
);
