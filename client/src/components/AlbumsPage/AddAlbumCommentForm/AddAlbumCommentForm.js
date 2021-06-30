import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { commentAlbum } from '../../../actions/albumAction';
import useStyles from './styles';

const AddAlbumCommentForm = (id, album) => {
  const [commentData, setCommentData] = useState({ comment: '' });
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCommentData( {comment: ''} );
  };

  useEffect(() => {
    if (!album?.albumName) {
      clear();
    } 
    if (album) {
      setCommentData({comment: ''});
    } 
  }, [album]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(commentAlbum(id.id, commentData, history));
    clear();
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
        <Typography variant="h4">{'Add a comment'}</Typography>
        <TextField name="comment" variant="outlined" label="Type your comment here..." fullWidth multiline rows={4} value={commentData.comment} onChange={(e) => setCommentData( {comment: e.target.value})}/>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default AddAlbumCommentForm;
