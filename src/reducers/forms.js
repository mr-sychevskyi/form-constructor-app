import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// ACTION CREATORS
export const addForm = createAction('FORMS::ADD');
export const updateForm = createAction('FORMS::UPDATE');
export const removeForm = createAction('FORMS::REMOVE');

// REDUCER
export const initialState = {
  data: [
    {
      id: 1221,
      name: 'User Form',
      fields: [
        {
          el: 'input',
          type: 'text',
          name: 'name',
          label: 'Name',
          required: true,
          placeholder: 'Enter name here'
        },
        {
          el: 'input',
          type: 'number',
          name: 'age',
          label: 'Age',
          required: false,
          placeholder: 'Enter age here'
        },
        {
          el: 'textarea',
          name: 'about',
          label: 'About',
          required: false,
          rows: 4,
          placeholder: 'Enter about info'
        },
        {
          el: 'checkbox',
          name: 'terms_conditions',
          label: 'Accept the Terms and Conditions',
          checked: false,
          icon: 'check_box'
        }
      ]
    },
    {
      id: 1331,
      name: 'Company Form',
      fields: [
        {
          el: 'input',
          type: 'text',
          name: 'company',
          label: 'Company',
          placeholder: 'Enter company here',
          required: true
        },
        {
          el: 'select',
          name: 'companyEmployees',
          label: 'The number of employees',
          placeholder: 'The number of employees',
          options: [
            {
              name: '0-100',
              value: 0
            },
            {
              name: '100-400',
              value: 1
            },
            {
              name: '400-1000',
              value: 2
            }
          ],
          defaultOption: 1
        },
        {
          el: 'radio',
          name: 'businessType',
          label: 'Business type',
          options: [
            {
              name: 'corporation',
              value: 0
            },
            {
              name: 'partnership',
              value: 1
            },
            {
              name: 'proprietorship',
              value: 2
            }
          ],
          defaultOption: 1
        },
        {
          el: 'input',
          type: 'email',
          name: 'email',
          label: 'Email',
          placeholder: 'Enter company email here',
          required: true
        },
        {
          el: 'textarea',
          name: 'questions',
          label: 'Your questions',
          required: false,
          rows: 4,
          placeholder: 'Feel free to ask any questions?'
        }
      ]
    }
  ],
  isLoading: false,
};

export default handleActions(
  {
    [addForm]: (state, { payload }) => ({
      ...state,
      data: [
        ...state.data,
        payload
      ]
    }),
    [updateForm]: (state, { payload }) => ({
      ...state,
      data: state.data.map(form => (form.id !== payload.id ? form : payload))
    }),
    [removeForm]: (state, { payload }) => ({
      ...state,
      data: state.data.filter(form => form.id !== payload)
    }),
  },
  initialState
);

// SELECTORS
export const getForms = state => state.forms.data;
export const currFormId = (state, props) => +props.match.params.id;

export const makeGetCurrForm = () => createSelector(
  [getForms, currFormId],
  (forms, id) => forms.filter(form => form.id === id)[0],
);
