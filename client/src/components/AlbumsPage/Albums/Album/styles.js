import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
    height: '100%',
    position: 'relative',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  overlay: {
    position: 'relative',
    top: '15px',
    left: '25px',
    paddingBottom: '30px'
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '25px',
    color: 'black',
  },
  cardActions: {
    padding: '0 17px 20px 17px',
    display: 'flex',
    justifyContent: 'space-between',
  }
});
