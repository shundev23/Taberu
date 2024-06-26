import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const API_BASE_URL = 'http://127.0.0.1:8000/omunavi/';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}profile/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}profile/`, profile, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
