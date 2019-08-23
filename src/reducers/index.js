import { combineReducers } from 'redux';
import auth from './auth';
import constructor from './constructor';
import forms from './forms';
import fills from './fills';

const reducers = combineReducers({
  auth,
  forms,
  fills,
  constructor,
});

export default reducers;
