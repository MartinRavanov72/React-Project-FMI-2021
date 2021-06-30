import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { deleteAlbum } from '../../../../actions/albumAction';
import useStyles from './styles';

const Album = ({ album, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const openAlbum = (e) => {
    history.push(`/albums/${album._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="album"
        className={classes.cardAction}
        onClick={openAlbum}
      >
        <div className={classes.overlay}>
          <Typography variant="h6">{album.albumName}</Typography>
          <Typography variant="body2">{moment(album.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?._id === album?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(album._id);
            }}
            style={{ color: 'black' }}
            size="small"
          >
            <EditIcon fontSize="default" style={{ 'paddingRight': '5px' }}/>
            Edit
          </Button>
        </div>
        )}
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user?.result?._id === album?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteAlbum(album._id))}>
            <DeleteIcon fontSize="small" style={{ 'paddingRight': '5px' }} /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Album;
