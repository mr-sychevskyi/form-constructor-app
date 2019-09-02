import { applyMiddleware, compose, createStore } from 'redux';
import reducers from 'reducers';
import middleware from 'middleware';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (allReducers, allMiddleware) => {
  return createStore(
    allReducers,
    {},
    composeEnhancers(applyMiddleware(...allMiddleware)));
};

const store = configureStore(reducers, middleware);

export default store;
