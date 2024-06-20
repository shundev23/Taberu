// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const registerUser = (user) => {
  return axios.post(`${API_URL}/register/`, user);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/token/`, credentials);
};

export const getRestaurants = () => {
  return axios.get(`${API_URL}/restaurants/`);
};
