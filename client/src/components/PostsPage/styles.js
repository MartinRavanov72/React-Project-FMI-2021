import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '10px',
  },
  searchButton: {    
    marginTop: '0.5rem',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  ul: {
    justifyContent: 'space-around',
  },
}));
