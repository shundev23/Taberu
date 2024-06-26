// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const registerUser = async (credentials) => {
  return await axiosInstance.post(`${API_URL}/register/`, credentials);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/token/`, credentials);
};

export const getRestaurants = () => {
  return axios.get(`${API_URL}/restaurants/`);
};

export const getRestaurantDetail = (id) => {
  return axios.get(`${API_URL}/restaurants/${id}/`);
};

const getCSRFToken = () => {
  const name = 'csrftoken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
};

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // DjangoサーバーのURL
  withCredentials: true, // CSRFトークンを含めるために必要
});

axiosInstance.interceptors.request.use(
  config => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);