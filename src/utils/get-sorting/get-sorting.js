// export const desc = (a, b, orderBy) => {
//   const valueA = a[orderBy];
//   const valueB = b[orderBy];
//
//   if (valueB < valueA) {
//     return -1;
//   }
//   if (valueB > valueA) {
//     return 1;
//   }
//   return 0;
// };

export const desc = (a, b, orderBy) => {
  const valueA = a[orderBy].toString();
  const valueB = b[orderBy].toString();

  if (!(valueA && valueB)) return 0;

  return valueB.localeCompare(valueA, undefined, { numeric: true, sensitivity: 'base' });
};

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};
