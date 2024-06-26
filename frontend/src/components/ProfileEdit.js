// src/components/ProfileEdit.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ProfileEdit = () => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/omunavi/profile/')
      .then(response => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch profile data');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://127.0.0.1:8000/omunavi/profile/', profileData)
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        setError('Failed to update profile');
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography component="h1" variant="h5">Edit Profile</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          value={profileData.name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={profileData.email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default ProfileEdit;
