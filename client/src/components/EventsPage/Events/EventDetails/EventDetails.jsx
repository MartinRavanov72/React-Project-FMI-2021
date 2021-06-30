import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getEvent, getEvents } from '../../../../actions/eventAction';
import useStyles from './styles';

const Event = () => {
  const { event, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEvent(id));
  }, [id]);

  useEffect(() => {
    if (event) {
      dispatch(getEvents());
    }
  }, [event]);

  if (!event) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography className={classes.row} variant="h5">Name: {event.eventName}</Typography>
          <Typography className={classes.row} variant="h5">Created by: {event.name}</Typography>
          <Typography className={classes.row} variant="h5">Date: {event.date}</Typography>
          <Typography className={classes.row} variant="h5">Venue: {event.venue}</Typography>
          <Typography className={classes.row} variant="h6">Created {moment(event.createdAt).fromNow()}</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Event;
