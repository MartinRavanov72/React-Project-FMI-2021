import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, CardMedia } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditBandInfoForm from '../../EditBandInfoForm/EditBandInfoForm'

import { getUser, getUsers } from '../../../../actions/userAction';
import useStyles from './styles';

const Band = () => {
  const { user, isLoading, albums } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);

  useEffect(() => {
    if (user) {
      dispatch(getUsers());
    }
  }, [user]);

  if (!user) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const Albums = () => {
    let allAlbums = JSON.parse(albums);
    if (allAlbums?.length > 0) {
      let cnt = 1;
      let cnt2 = 0;
      return allAlbums.map((album) => ( 
        <div key={ cnt++}>
          <Typography className={classes.album} key={cnt++} variant="body1">{ cnt - (cnt2++)*2}. Name: {album.albumName}</Typography>
          <Typography className={classes.songs} key={cnt++} variant="body1">Songs: {album.songs}</Typography>
        </div>
      ))
    }

    return <Typography variant="body2">No albums</Typography>;
  };

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <CardMedia className={classes.media} image={user.img} title={user.name} />
          <Typography className={classes.row} variant="h6">Name: {user.name}</Typography>
          <Typography className={classes.row} variant="h6">Genre: {user.genre}</Typography>
          <Typography className={classes.row} variant="h6">Albums section:</Typography>
          <Albums />
          {(currentUser?.result?._id === user?._id) && (
            <EditBandInfoForm id={id} band={ user }/>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default Band;
