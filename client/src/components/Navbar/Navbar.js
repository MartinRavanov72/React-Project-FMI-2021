import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import interbandText from '../../images/interbandText.png'

import { LOGOUT } from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push('/users/signIn');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={interbandText} alt="icon" height="45px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.img}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button component={Link} to="/" variant="contained" className={classes.btn} color="primary">Posts</Button>
            <Button component={Link} to="/albums" variant="contained" className={classes.btn} color="primary">Albums</Button>
            <Button component={Link} to="/events" variant="contained" className={classes.btn} color="primary">Events</Button>
            <Button component={Link} to="/users" variant="contained" className={classes.btn} color="primary">Bands</Button>
            <Button variant="contained" className={classes.log} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div className={classes.profile}>
            <Button component={Link} to="/" variant="contained" className={classes.btn} color="primary">Posts</Button>
            <Button component={Link} to="/albums" variant="contained" className={classes.btn} color="primary">Albums</Button>
            <Button component={Link} to="/events" variant="contained" className={classes.btn} color="primary">Events</Button>
            <Button component={Link} to="/users" variant="contained" className={classes.btn} color="primary">Bands</Button>
            <Button component={Link} to="/users/signIn" className={classes.log} variant="contained" color="secondary">Sign In</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
