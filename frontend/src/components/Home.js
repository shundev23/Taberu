import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  results: {
    marginTop: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
}));

const getCSRFToken = () => {
  let csrfToken = null;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    if (cookie.trim().startsWith('csrftoken=')) {
      csrfToken = cookie.trim().substring('csrftoken='.length);
      break;
    }
  }
  return csrfToken;
};

const Home = () => {
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    const csrfToken = getCSRFToken();
    try {
      const response = await axios.get('http://127.0.0.1:8000/omunavi/restaurants', {
        params: {
          location: location,
          rating: rating,
          price: price,
        },
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.data.status === 'OK') {
        setRestaurants(response.data.results);
      } else {
        setError('レストランの情報を取得できませんでした。');
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError('レストランの情報を取得できませんでした。');
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h3" gutterBottom>
        レストラン検索
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <TextField
            label="地域"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <TextField
            label="評価"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={classes.input}
            select
          >
            <MenuItem value={''}>すべて</MenuItem>
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
            <MenuItem value={'5'}>5</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label="価格帯"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={classes.input}
            select
          >
            <MenuItem value={''}>すべて</MenuItem>
            <MenuItem value={'1'}>安い</MenuItem>
            <MenuItem value={'2'}>普通</MenuItem>
            <MenuItem value={'3'}>高い</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSearch}
          >
            検索
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" className={classes.results}>
          {error}
        </Typography>
      )}
      {restaurants.length > 0 && (
        <div className={classes.results}>
          <Typography variant="h5">検索結果</Typography>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>{restaurant.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Home;
