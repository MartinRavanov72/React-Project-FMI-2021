import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Album from './Album/Album';

const Albums = ({ setCurrentId }) => {
  const { albums, isLoading } = useSelector((state) => state.albums);

  if (!albums.length && !isLoading) return 'No albums';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {albums?.map((album) => (
          <Grid key={album._id} item xs={12} sm={12} md={6} lg={3}>
            <Album album={album} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Albums;
