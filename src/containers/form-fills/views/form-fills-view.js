import React from 'react';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { getSorting, stableSort } from 'utils';
import FormFillsTableHead from './form-fills-table-head';

import useStyles from './form-fills-styles';

const FormFillsView = ({ fills, currForm }) => {
  const rows = fills.map(fill => fill.fields);
  const initialOrderBy = Object.keys(rows[0])[0];
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(initialOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {!fills.length
        ? <h3>No fills!</h3>
        : (
          <>
            <Typography className={classes.tableTitle} variant="h4" id="tableTitle">
              {currForm ? `${currForm.name} fills` : 'Fills'}
            </Typography>
            <Paper className={classes.paper}>
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="medium"
                >
                  <FormFillsTableHead
                    classes={classes}
                    fills={fills}
                    numSelected={0}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody className={classes.tableBody}>
                    {stableSort(rows, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = false;

                        return (
                          <TableRow
                            hover
                            key={index}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                          >
                            {Object.values(row).map((item, index) => (
                              <TableCell key={index}><span>{item}</span></TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </Paper>
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <div className="app-navigation">
              <Link className="btn btn-go-back" to="/">
                <i className="btn__icon material-icons">keyboard_backspace</i>
                <span className="btn__text">Go back</span>
              </Link>
            </div>
          </>
        )}
    </>
  );
};

export default FormFillsView;
