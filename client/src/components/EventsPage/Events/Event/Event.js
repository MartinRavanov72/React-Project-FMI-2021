import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { goToEvent, deleteEvent } from '../../../../actions/eventAction';
import useStyles from './styles';

const Event = ({ event, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const Goings = () => {
    if (event?.goings?.length > 0) {
      return event.goings.find((going) => going === user?.result?._id)
        ? (
          <><CheckCircleIcon fontSize="small" />&nbsp;{event.goings.length > 2 ? `You and ${event.goings.length - 1} others` : `${event.goings.length} will go` }</>
        ) : (
          <><CheckCircleOutlineIcon fontSize="small" />&nbsp;{event.goings.length} {event.goings.length === 1 ? 'Going' : 'Goings'}</>
        );
    }

    return <><CheckCircleOutlineIcon fontSize="small" />&nbsp;Go to event</>;
  };

  const openEvent = (e) => {
    history.push(`/events/${event._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="event"
        className={classes.cardAction}
        onClick={openEvent}
      >
        <div className={classes.overlay}>
          <Typography variant="h6">{event.name}</Typography>
          <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?._id === event?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(event._id);
            }}
            style={{ color: 'black' }}
            size="small"
          >
            <EditIcon fontSize="default" style={{ 'paddingRight': '5px' }}/>
            Edit
          </Button>
        </div>
        )}
        <CardContent>
          <Typography variant="body2" style={{padding: '0 0 8px 15px', color: '#575859'}} component="p">{event.eventName?.length > 20 ? event?.eventName.substring(0, 20).concat('...') : event.eventName}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(goToEvent(event._id))}>
          <Goings />
        </Button>
        {(user?.result?._id === event?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteEvent(event._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Event;
