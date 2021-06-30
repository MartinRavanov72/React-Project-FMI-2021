import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../../../actions/postAction';
import useStyles from './styles';

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none' }));
    }
  }, [post]);

  if (!post) return null;

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
          <Typography className={classes.row} variant="h4">{post.name}</Typography>
          <Typography className={classes.row} variant="h5" style={{padding: '0 0 20px 15px', color: '#575859'}} >{post.message}</Typography>
          <Typography className={classes.row} variant="h6" style={{padding: '0'}}>{moment(post.createdAt).fromNow()}</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Post;
