import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/omunavi/';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}password-reset/`, { email });
      alert('Password reset link sent');
    } catch (error) {
      console.error('Failed to send password reset link', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={handleChange} />
      </div>
      <button type="submit">Send Password Reset Link</button>
    </form>
  );
};

export default PasswordReset;
