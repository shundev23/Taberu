import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          OmuNavi
        </Typography>
        <Button color="inherit">
          <Link to="/" className={classes.link}>Home</Link>
        </Button>
        <Button color="inherit">
          <Link to="/profile/edit" className={classes.link}>Edit Profile</Link>
        </Button>
        <Button color="inherit">
          <Link to="/search" className={classes.link}>Search</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
