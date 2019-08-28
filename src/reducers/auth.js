import { createAction, handleActions } from 'redux-actions';

// ACTION
export const setRole = createAction('AUTH_ROLE_SET');

// REDUCER
export const initialState = {
  role: 'admin',
  isLoading: false,
};

export default handleActions(
  {
    [setRole]: (state, { payload }) => ({
      ...state,
      role: payload
    }),
  },
  initialState
);

// SELECTORS
export const getAuthRole = state => state.auth.role;
