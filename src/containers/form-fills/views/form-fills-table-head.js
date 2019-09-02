import React from 'react';
import PropTypes from 'prop-types';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const FormFillsTableHead = ({ classes, fills, order, orderBy, onRequestSort }) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const headRows = Object.keys(fills[0].fields).map(fill => ({
    id: fill,
    label: fill
  }));

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            padding="default"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              href="#"
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

FormFillsTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default FormFillsTableHead;
