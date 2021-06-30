import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signIn, signUp } from '../../actions/userAction';

import useStyles from './styles';
import Input from './Input';

const initialState = { name: '', img: '', genre: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    if (isSignUp) {
      history.push("/users/signIn");
    } else {
      history.push("/users/signUp")
    }
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(form, history));
    } else {
      dispatch(signIn(form, history));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
       <Paper className={classes.paper} elevation={6}>
         <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
         </Avatar>
         <Typography component="h1" variant="h4">{ isSignUp ? 'Sign up' : 'Sign in' }</Typography>
         <form className={classes.form} onSubmit={handleSubmit}>
           <Grid container spacing={2}>
            {isSignUp && (
              <>
              <Input name="name" label="Your band's name" handleChange={handleChange} autoFocus />
              <Input name="img" label="Your band's image url" handleChange={handleChange} />
              <Input name="genre" label="Your band's genre" handleChange={handleChange} />
              </>
            )}
            <Input name="email" label="Your email" handleChange={handleChange} type="email" autoFocus />
            <Input name="password" label="Your password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignUp && <Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}  >
                { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
