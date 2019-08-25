import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { uniqueId } from 'utils';

// ACTION CREATORS
export const addFill = createAction('FILL::ADD');
export const updateFill = createAction('FILL::UPDATE');

// REDUCER
export const initialState = {
  data: [
    {
      id: 1221,
      fills: [
        {
          id: 92351,
          fields: {
            Name: 'John',
            Age: 1994,
            About: 'Intern',
            'Accept the terms and conditions': false,
          }
        },
        {
          id: 23514,
          fields: {
            Name: 'Piter',
            Age: 1998,
            About: 'Student',
            'Accept the terms and conditions': true,
          }
        }
      ]
    },
  ]
};

export default handleActions(
  {
    [addFill]: (state, { payload }) => ({
      ...state,
      data: [
        ...state.data,
        {
          id: payload.id,
          fills: [
            {
              id: uniqueId(),
              fields: payload.fields
            }
          ]
        }
      ]
    }),
    [updateFill]: (state, { payload }) => ({
      ...state,
      data: state.data.map(form => {
        if (form.id !== payload.id) return form;

        return {
          ...form,
          fills: [
            ...form.fills,
            {
              id: uniqueId(),
              fields: payload.fields
            }
          ]
        };
      })
    })
  },
  initialState
);

// SELECTORS
export const getFills = state => state.fills.data;
export const currFormId = (state, props) => +props.match.params.id;

export const getFormFills = createSelector(
  [getFills, currFormId],
  (fills, id) => {
    const currFormFills = fills.filter(form => form.id === id);

    return currFormFills.length ? currFormFills[0].fills : [];
  }
);

export const getFormFillsTotal = createSelector(
  getFormFills,
  fills => fills.length
);

export const getFormFillsTotalList = createSelector(
  getFills,
  fills => fills.reduce((res, fill) => ({
    ...res,
    [fill.id]: fill.fills.length
  }), {})
);
