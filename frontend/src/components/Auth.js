import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/get-csrf-token/', { withCredentials: true });
                const csrfToken = document.cookie.split('; ')
                    .find(row => row.startsWith('csrftoken'))
                    .split('=')[1];
                setCsrfToken(csrfToken);
            } catch (error) {
                console.error('Failed to get CSRF token:', error);
            }
        };

        getCsrfToken();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/auth/login/', {
                email,
                password
            }, {
                headers: {
                    'X-CSRFToken': csrfToken
                },
                withCredentials: true
            });
            localStorage.setItem('token', response.data.key);
            window.location.href = '/search';
        } catch (error) {
            console.error(error);
            setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/auth/registration/', {
                email,
                password1: password,
                password2
            }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log('User registered successfully:', response.data);
            setError('');
            setIsLogin(true); // 登録後にログイン画面に戻る
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
            <h2 style={styles.title}>{isLogin ? 'ログイン' : 'ユーザー登録'}</h2>
            <form onSubmit={isLogin ? handleLogin : handleRegister} style={styles.form}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                {!isLogin && (
                    <input
                        type="password"
                        placeholder="パスワード（確認）"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        style={styles.input}
                    />
                )}
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>{isLogin ? 'ログイン' : '登録'}</button>
            </form>
            <p style={styles.toggleText}>
                {isLogin ? "アカウントをお持ちでないですか？ " : "既にアカウントをお持ちですか？ "}
                <span onClick={() => setIsLogin(!isLogin)} style={styles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </span>
            </p>
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
    toggleText: {
        marginTop: '10px',
        color: '#333',
    },
    toggleLink: {
        color: '#007bff',
        cursor: 'pointer',
    },
};

export default Auth;
