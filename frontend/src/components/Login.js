import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { Container, Box, TextField, Button, Typography, Avatar, createTheme, ThemeProvider, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import { ReactComponent as OmuriceIcon } from '../assets/omunavi-icon.svg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5B041',
    },
    secondary: {
      main: '#E67E22',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = username ? "" : "Username is required.";
    if (!isLogin) {
      tempErrors.email = email ? "" : "Email is required.";
      if (email) tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? "" : "Email is not valid.";
    }
    tempErrors.password = password ? "" : "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const credentials = { username, password, email: isLogin ? undefined : email };
    try {
      if (isLogin) {
        const response = await loginUser(credentials);
        localStorage.setItem('token', response.data.access);
        alert('Login successful');
      } else {
        const response = await registerUser(credentials);
        alert('Registration successful');
      }
    } catch (error) {
      console.error(error);
      setServerError(`Error ${isLogin ? 'logging in' : 'registering'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 80, height: 80 }}>
            <OmuriceIcon width="60" height="60" />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Sign in' : 'Sign up'}
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={isLogin ? 0 : 1}
              onChange={(e, newValue) => setIsLogin(newValue === 0)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            {serverError && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {serverError}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
