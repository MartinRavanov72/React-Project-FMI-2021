import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getAlbum, getAlbums } from '../../../../actions/albumAction';
import AddAlbumCommentForm from '../../AddAlbumCommentForm/AddAlbumCommentForm'
import useStyles from './styles';

const Album = () => {
  const { album, isLoading } = useSelector((state) => state.albums);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAlbum(id));
  }, [id]);

  useEffect(() => {
    if (album) {
      dispatch(getAlbums());
    }
  }, [album]);

  const Comments = () => {
    if (album?.comments?.length > 0) {
      let cnt = 1;
      return album.comments.filter(comment => comment != null).map((comment) => (
        <Typography className={classes.comment} key={cnt++} variant="body1">{ cnt }. {comment}</Typography>
      ))
    }

    return <Typography variant="body1">No comments</Typography>;
  };

  if (!album) return null;

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
          <Typography className={classes.row} variant="h5">Name: {album.albumName}</Typography>
          <Typography className={classes.row} variant="h5">Songs: {album.songs}</Typography>
          <Typography className={classes.row} variant="h5">By {album.name}</Typography>
          <Typography className={classes.row} variant="h5">Comment section: </Typography>
          <Comments />
          <Typography className={classes.row} style={{ padding: '10px 0 50px 0'}} variant="body1">{moment(album.createdAt).fromNow()}</Typography>
          <AddAlbumCommentForm id={id} album={ album }/>
        </div>
      </div>
    </Paper>
  );
};

export default Album;
