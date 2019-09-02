import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 750,
  },
  tableTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    fontSize: '20px',
    padding: '0 16px',
    textTransform: 'uppercase'
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '4px'
  },
  tableHead: {
    backgroundColor: '#d6d0cb',
    '& th': {
      fontSize: '16px',
    }
  },
  tableBody: {
    '& td': {
      whiteSpace: 'nowrap',
    }
  },
  tablePagination: {
    marginBottom: theme.spacing(1),
    fontSize: '14px',
    color: 'rgba(50, 50, 50, .9)',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default useStyles;
