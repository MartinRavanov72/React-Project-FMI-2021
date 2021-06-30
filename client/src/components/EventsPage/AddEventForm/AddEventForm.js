import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createEvent, updateEvent } from '../../../actions/eventAction';
import useStyles from './styles';

const AddEventForm = ({ currentId, setCurrentId }) => {
  const [eventData, setEventData] = useState({ eventName: '', venue: '', date: '' });
  const event = useSelector((state) => (currentId ? state.events.events.find((eventName) => eventName._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setEventData({ eventName: '', venue: '', date: '' });
  };

  useEffect(() => {
    if (!event?.eventName) {
      clear();
    } 
    if (event) {
      setEventData(event);
    } 
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createEvent({ ...eventData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateEvent(currentId, { ...eventData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to use Interband.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing your event` : 'Creating an event'}</Typography>
        <TextField name="eventName" variant="outlined" label="Name" fullWidth multiline rows={4} value={eventData.eventName} onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })} />
        <TextField name="venue" variant="outlined" label="Venue" fullWidth multiline rows={4} value={eventData.venue} onChange={(e) => setEventData({ ...eventData, venue: e.target.value })} />
        <TextField name="date" variant="outlined" label="Date" fullWidth multiline rows={4} value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default AddEventForm;
