import { applyMiddleware, compose, createStore } from 'redux';
import reducers from 'reducers';
import middlewares from 'middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (allReducers, allMiddlewares) => {
  return createStore(
    allReducers,
    {},
    composeEnhancers(applyMiddleware(...allMiddlewares)));
};

const store = configureStore(reducers, middlewares);

export default store;
