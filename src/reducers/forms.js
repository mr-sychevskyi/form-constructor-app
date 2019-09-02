import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { api, callApi } from 'api';

// ACTIONS
const getFormsRequest = createAction('FORMS_GET_REQUEST');
const getFormsSuccess = createAction('FORMS_GET_SUCCESS');
const getFormsFailure = createAction('FORMS_GET_FAILURE');

const addFormRequest = createAction('FORMS_ADD_REQUEST');
const addFormSuccess = createAction('FORMS_ADD_SUCCESS');
const addFormFailure = createAction('FORMS_ADD_FAILURE');

const updateFormRequest = createAction('FORMS_UPDATE_REQUEST');
const updateFormSuccess = createAction('FORMS_UPDATE_SUCCESS');
const updateFormFailure = createAction('FORMS_UPDATE_FAILURE');

// ASYNC ACTIONS
export const getForms = () => callApi({
  types: [getFormsRequest, getFormsSuccess, getFormsFailure],
  action: () => api.get('forms')
});

export const addForm = data => callApi({
  types: [addFormRequest, addFormSuccess, addFormFailure],
  action: () => api.post('forms', data)
});

export const updateForm = (data, id) => callApi({
  types: [updateFormRequest, updateFormSuccess, updateFormFailure],
  action: () => api.put(`forms/${id}`, data)
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
    [getFormsRequest]: state => ({
      ...state,
      loading: true,
    }),
    [getFormsSuccess]: (state, { payload }) => ({
      ...state,
      data: payload,
      loading: false,
      loaded: true,
    }),
    [getFormsFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload
    }),

    [addFormRequest]: state => ({
      ...state,
      loading: true,
    }),
    [addFormSuccess]: (state, { payload }) => ({
      ...state,
      data: [...state.data, payload],
      loading: false,
      loaded: true,
    }),
    [addFormFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload
    }),

    [updateFormRequest]: state => ({
      ...state,
      loading: true,
    }),
    [updateFormSuccess]: (state, { payload }) => ({
      ...state,
      data: state.data.map(form => (
        form._id.$oid !== payload._id.$oid
          ? form
          : payload
      )),
      loading: false,
      loaded: true,
    }),
    [updateFormFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload
    }),
  },
  initialState
);

// SELECTORS
export const formsDataSelector = state => state.forms.data;
export const formsLoadingSelector = state => state.forms.loading;
export const formsLoadedSelector = state => state.forms.loaded;
export const formsErrorSelector = state => state.forms.error;
export const currFormId = (state, props) => props.match.params.id;

export const makeGetCurrForm = () => createSelector(
  [formsDataSelector, currFormId],
  (forms, id) => forms.filter(form => form._id.$oid === id)[0],
);
