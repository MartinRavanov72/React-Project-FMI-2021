import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostsPage/Posts/PostDetails/PostDetails';
import BandDetails from './components/BandsPage/Bands/BandDetails/BandDetails';
import AlbumDetails from './components/AlbumsPage/Albums/AlbumDetails/AlbumDetails';
import EventDetails from './components/EventsPage/Events/EventDetails/EventDetails';
import Navbar from './components/Navbar/Navbar';
import PostsPage from './components/PostsPage/PostsPage';
import AuthPage from './components/AuthPage/AuthPage';
import BandsPage from './components/BandsPage/BandsPage';
import AlbumsPage from './components/AlbumsPage/AlbumsPage';
import EventsPage from './components/EventsPage/EventsPage';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: red[600],
    }
  },
});

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={PostsPage} />
          <Route path="/posts/search" exact component={PostsPage} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/events" exact component={EventsPage} />
          <Route path="/events/:id" exact component={EventDetails} />
          <Route path="/users/signIn" exact component={() => (!user ? <AuthPage /> : <Redirect to="/posts" />)} />
          <Route path="/users/signUp" exact component={() => (!user ? <AuthPage /> : <Redirect to="/posts" />)} />
          <Route path="/users" exact component={BandsPage} />
          <Route path="/users/:id" exact component={BandDetails} />
          <Route path="/albums" exact component={AlbumsPage} />
          <Route path="/albums/:id" exact component={AlbumDetails} />
        </Switch>
        {/* <footer>    
          <p>Interband © All rights reserved</p>
          <p>The best place for bands to communicate and share their work</p>
          <p>For more info write to use on our email: interband.support@interband.com</p>
        </footer> */}
      </Container>
      </BrowserRouter>
      </MuiThemeProvider>
  );
};

export default App;
