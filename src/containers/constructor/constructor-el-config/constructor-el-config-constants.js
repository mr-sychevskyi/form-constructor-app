export const ATTRIBUTES_CONFIG = {
  name: ['input', 'checkbox', 'radio', 'select', 'textarea'],
  label: ['input', 'checkbox', 'radio', 'select', 'textarea'],
  placeholder: ['input', 'select1', 'textarea'],
  type: ['input'],
  rows: ['textarea'],
  checked: ['checkbox'],
  required: ['input', 'textarea'],
  options: ['radio', 'select'],
  defaultOption: ['radio', 'select'],
};

export const TYPE_ATTR_OPTIONS = ['text', 'number', 'email', 'date'].map(
  (type, index) => ({
    name: type,
    value: index
  }));
