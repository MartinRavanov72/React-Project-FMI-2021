/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getAlbums } from '../../actions/albumAction';
import useStyles from '../AlbumsPage/styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.albums);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getAlbums(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/albums?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
