import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

const middlewares = [
  thunk,
  reduxLogger
];

export default middlewares;
