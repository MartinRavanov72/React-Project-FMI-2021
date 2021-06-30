import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateUser } from '../../../actions/userAction';
import useStyles from './styles';

const EditBandInfoForm = ({ id, band }) => {
  const [bandData, setBandData] = useState({img: '', genre: '', name: ''});
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setBandData({img: '', genre: '', name: ''});
  };

  useEffect(() => {
    if (!band?.email) {
      clear();
    } 
    if (band) {
      setBandData({img: band.img, genre: band.genre, name: band.name});
    } 
  }, [band]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateUser(id, { ...bandData }, history));
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
    <Paper style={{ margin: '50px 0 0 0'}} className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{`Edit your band's info`}</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth multiline rows={4} value={bandData.name} onChange={(e) => setBandData({ ...bandData, name: e.target.value })} />
        <TextField name="img" variant="outlined" label="Image" fullWidth multiline rows={4} value={bandData.img} onChange={(e) => setBandData({ ...bandData, img: e.target.value })} />
        <TextField name="genre" variant="outlined" label="Genre" fullWidth multiline rows={4} value={bandData.genre} onChange={(e) => setBandData({ ...bandData, genre: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default EditBandInfoForm;
