import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/auth/registration/', {
                email,
                password1,
                password2
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log('User registered successfully:', response.data);
            setError('');
        } catch (error) {
            console.error('Registration error:', error.response);
            if (error.response && error.response.status === 400) {
                setError('Registration failed. Please check the provided information.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>ユーザー登録</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="パスワード（確認）"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>登録</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '300px',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        width: '320px',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#ffcc00',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default Register;
