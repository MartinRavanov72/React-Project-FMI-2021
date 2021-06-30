import React, { useState } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import Events from './Events/Events';
import AddEventForm from './AddEventForm/AddEventForm';
import EventsPagination from './EventsPagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const EventsPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;

  const [currentId, setCurrentId] = useState(0);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <AddEventForm currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={9}>
            <Events setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <EventsPagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default EventsPage;
