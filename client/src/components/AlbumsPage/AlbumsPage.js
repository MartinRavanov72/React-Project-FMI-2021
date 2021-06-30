import React, { useState } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import Albums from './Albums/Albums';
import AddAlbumForm from './AddAlbumForm/AddAlbumForm';
import AlbumsPagination from './AlbumsPagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AlbumsPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const [currentId, setCurrentId] = useState(0);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
              <AddAlbumForm currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={9}>
            <Albums setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
                <AlbumsPagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default AlbumsPage;
