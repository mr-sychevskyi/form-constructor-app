import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

const middleware = [thunk];

export default process.env.NODE_ENV === 'development'
  ? [...middleware, reduxLogger]
  : [...middleware];
