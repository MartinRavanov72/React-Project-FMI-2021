import React from 'react';
import { Card, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Band = ({ band }) => {
  const classes = useStyles();
  const history = useHistory();

  const openBand = (e) => {
    history.push(`/users/${band._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="band"
        className={classes.cardAction}  
        onClick={openBand}
      >
        <CardMedia className={classes.media} image={band.img} title={band.name} />
        <div className={classes.overlay}>
          <Typography variant="h6">{band.name}</Typography>
        </div>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">Genre: {band.genre}</Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default Band;
