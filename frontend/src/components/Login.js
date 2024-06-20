// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    try {
        const response = await loginUser(credentials);
        localStorage.setItem('token', response.data.access);
        alert('Login successful');
    } catch (error) {
        console.error(error);
        alert('Error logging in');
    }
};

return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
    </form>
    );
};

export default Login;
