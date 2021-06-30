import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  row: {
    paddingBottom: "10px"
  },
  album: {
    paddingBottom: '6px',
    fontSize: '1.2rem',
    marginLeft: '15px'
  },
  songs: {
    padding: '0 0 15px 22px',
    fontSize: '1.2rem',
    marginLeft: '15px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backgroundBlendMode: 'darken',
    marginBottom: '15px'
  },
}));
