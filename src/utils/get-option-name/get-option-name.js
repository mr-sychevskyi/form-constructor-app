export const getOptionName = (options, currValue) =>
  options.filter(option => option.value === +currValue)[0].name;
