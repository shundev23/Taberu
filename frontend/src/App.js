import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Register from './components/Register';
import Login from './components/Login';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import Profile from './components/Profile';
import LogoutButton from './components/LogoutButton';
import PasswordReset from './components/PasswordReset';
import ProfileEdit from './components/ProfileEdit';
import Navbar from './components/Navbar';
import Home from './components/Home';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
