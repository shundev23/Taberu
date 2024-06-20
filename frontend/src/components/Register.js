// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, email, password };
    try {
        await registerUser(user);
        alert('User registered successfully');
    } catch (error) {
        console.error(error);
        alert('Error registering user');
    }
};

return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
    </form>
    );
};

export default Register;
