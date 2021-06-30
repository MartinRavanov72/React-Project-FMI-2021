import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createAlbum, updateAlbum } from '../../../actions/albumAction';
import useStyles from './styles';

const AddAlbumForm = ({ currentId, setCurrentId }) => {
  const [albumData, setAlbumData] = useState({ albumName: '', songs: ''});
  const album = useSelector((state) => (currentId ? state.albums.albums.find((albumName) => albumName._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setAlbumData({ albumName: '', songs: '' });
  };

  useEffect(() => {
    if (!album?.albumName && !album?.songs) {
      clear();
    } 
    if (album) {
      setAlbumData(album);
    } 
  }, [album]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createAlbum({ ...albumData,  name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateAlbum(currentId, { ...albumData, name: user?.result?.name }));
      clear();
    }
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
        <Typography variant="h6">{currentId ? `Edit your album` : 'Creatе an album'}</Typography>
        <TextField name="albumName" variant="outlined" label="Name" fullWidth multiline rows={4} value={albumData.albumName} onChange={(e) => setAlbumData({ ...albumData, albumName: e.target.value })} />
        <TextField name="songs" variant="outlined" label="Songs" fullWidth multiline rows={4} value={albumData.songs} onChange={(e) => setAlbumData({ ...albumData, songs: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default AddAlbumForm;
