import React from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import Bands from './Bands/Bands';
import BandsPagination from './BandsPagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const BandsPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Bands />
          </Grid>
          <Paper className={classes.pagination} elevation={6}>
            <BandsPagination page={page} />
          </Paper>
        </Grid>
      </Container>
    </Grow>
  );
};

export default BandsPage;
