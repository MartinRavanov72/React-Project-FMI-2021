import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/postAction';
import Posts from './Posts/Posts';
import AddPostForm from './AddPostForm/AddPostForm';
import PostsPagination from './PostsPagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const PostsPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const history = useHistory();

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      history.push(`/posts/search?searchQuery=${search || 'none'}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search posts" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" fullWidth>Search</Button>
            </AppBar>
            <AddPostForm currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={9}>
            <Posts setCurrentId={setCurrentId} />
            {(!searchQuery) && (
              <Paper className={classes.pagination} elevation={6}>
                <PostsPagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default PostsPage;
