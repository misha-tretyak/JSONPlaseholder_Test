import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  menuButton: {
    flexGrow: 1,
    marginLeft: theme.spacing(75),
  },
  title: {
    flexGrow: 0,
    marginRight: theme.spacing(2),
  },
  buttons: {
    marginRight: theme.spacing(1),
  }
}));

export default function MenuAppBar() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Incora Test
          </Typography>
          <Button 
            className={classes.buttons} 
            onClick={() => history.push('/')} 
            variant="contained" 
            color="primary" >
            People
          </Button>
          <Button 
            className={classes.buttons} 
            onClick={() => history.push('/posts')} 
            variant="contained" 
            color="primary" >
            Posts
          </Button>         
        </Toolbar>
      </AppBar>
    </div>
  );
}
