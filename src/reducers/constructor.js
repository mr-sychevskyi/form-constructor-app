import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { uniqueId } from 'utils';

// ACTIONS
export const addToConstructor = createAction('CONSTRUCTOR_ADD');
export const updateConstructor = createAction('CONSTRUCTOR_UPDATE');
export const updateConstructorOrder = createAction('CONSTRUCTOR_ORDER_UPDATE');
export const removeFromConstructor = createAction('CONSTRUCTOR_REMOVE');
export const resetConstructorData = createAction('CONSTRUCTOR_RESET');

// REDUCER
export const initialState = {
  data: [],
  isLoading: false,
};

export default handleActions(
  {
    [addToConstructor]: (state, { payload }) => ({
      ...state,
      data: [
        ...state.data,
        {
          id: uniqueId(),
          ...payload
        }
      ]
    }),
    [updateConstructor]: (state, { payload }) => ({
      ...state,
      data: state.data.map(el => (
        el.id !== payload.id
          ? el
          : {
            ...el,
            ...payload
          }
      )),
    }),
    [updateConstructorOrder]: (state, { payload }) => ({
      ...state,
      data: payload.map((item => state.data.filter(field => field.id === item)[0]))
    }),
    [removeFromConstructor]: (state, { payload }) => ({
      ...state,
      data: state.data.filter(el => el.id !== payload)
    }),
    [resetConstructorData]: () => initialState,
  },
  initialState
);

// SELECTORS
export const constructorElements = state => state.constructor.data || [];

export const constructorElementsTotal = createSelector(
  constructorElements,
  elements => elements.length
);

export const constructorElementsNames = createSelector(
  constructorElements,
  fields => fields.reduce((res, field) => ({
    ...res,
    [field.id]: field.name
  }), {})
);
