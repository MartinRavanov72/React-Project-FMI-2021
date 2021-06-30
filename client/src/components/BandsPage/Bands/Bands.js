import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Band from './Band/Band';

const Bands = () => {
  const { users, isLoading } = useSelector((state) => state.users);

  if (!users.length && !isLoading) return 'No bands';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {users?.map((user) => (
          <Grid key={user._id} item xs={12} sm={6} md={6} lg={3}>
            <Band band={user}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Bands;
