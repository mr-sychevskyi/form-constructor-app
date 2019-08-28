import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { api, callApi } from 'api';

// ACTIONS
const getFillsRequest = createAction('FILLS_GET_REQUEST');
const getFillsSuccess = createAction('FILLS_GET_SUCCESS');
const getFillsFailure = createAction('FILLS_GET_FAILURE');

const addFillRequest = createAction('FILLS_ADD_REQUEST');
const addFillSuccess = createAction('FILLS_ADD_SUCCESS');
const addFillFailure = createAction('FILLS_ADD_FAILURE');

const updateFillRequest = createAction('FILLS_UPDATE_REQUEST');
const updateFillSuccess = createAction('FILLS_UPDATE_SUCCESS');
const updateFillFailure = createAction('FILLS_UPDATE_FAILURE');

// ASYNC ACTIONS
export const getFills = () => callApi({
  types: [getFillsRequest, getFillsSuccess, getFillsFailure],
  action: () => api.get('fills')
});

export const addFill = data => callApi({
  types: [addFillRequest, addFillSuccess, addFillFailure],
  action: () => api.post('fills', data)
});

export const updateFill = (data, id) => callApi({
  types: [updateFillRequest, updateFillSuccess, updateFillFailure],
  action: () => api.put(`fills/${id}`, data)
});

// REDUCER
export const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};

export default handleActions(
  {
    [getFillsRequest]: state => ({
      ...state,
      loading: true,
    }),
    [getFillsSuccess]: (state, { payload }) => ({
      ...state,
      data: payload,
      loading: false,
      loaded: true,
    }),
    [getFillsFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error
    }),

    [addFillRequest]: state => ({
      ...state,
      loading: true,
    }),
    [addFillSuccess]: (state, { payload }) => ({
      ...state,
      data: [...state.data, payload],
      loading: false,
      loaded: true,
    }),
    [addFillFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload
    }),

    [updateFillRequest]: state => ({
      ...state,
      loading: true,
    }),
    [updateFillSuccess]: (state, { payload }) => ({
      ...state,
      data: [...state.data, payload],
      loading: false,
      loaded: true,
    }),
    [updateFillFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error
    }),
  },
  initialState
);

// SELECTORS
export const fillsDataSelector = state => state.fills.data;
export const fillsLoadingSelector = state => state.fills.loading;
export const fillsLoadedSelector = state => state.fills.loaded;
export const fillsErrorSelector = state => state.fills.error;
export const currFormId = (state, props) => props.match.params.id;

export const formFillsSelector = createSelector(
  [fillsDataSelector, currFormId],
  (fills, id) => {
    const currFormFills = fills.filter(form => form._id.$oid === id);

    return currFormFills.length ? currFormFills[0].fills : [];
  }
);

export const formFillsTotalSelector = createSelector(
  formFillsSelector,
  fills => fills.length
);

export const fillsTotalListSelector = createSelector(
  fillsDataSelector,
  fills => fills.reduce((res, fill) => ({
    ...res,
    [fill._id.$oid]: fill.fills.length
  }), {})
);
