/* eslint no-unused-vars: "off"  */

import { componseWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import createHistrory from 'history/createBrowserHistory';
import rootReducer from './reducers';

export const history = createHistrory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, promise(), routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
