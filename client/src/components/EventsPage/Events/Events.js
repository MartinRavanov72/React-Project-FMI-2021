import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Event from './Event/Event';

const Events = ({ setCurrentId }) => {
  const { events, isLoading } = useSelector((state) => state.events);

  if (!events.length && !isLoading) return 'No events';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {events?.map((event) => (
          <Grid key={event._id} item xs={12} sm={12} md={12} lg={3}>
            <Event event={event} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Events;
