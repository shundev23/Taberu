import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [category, setCategory] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');  // 保存された認証トークンを取得
            const response = await axios.get('/api/restaurants/', {
                params: { category },
                headers: { Authorization: `Token ${token}` }  // トークンをヘッダーに追加
            });
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>オムライス店検索</h2>
            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    type="text"
                    placeholder="カテゴリ (例: 和風, 洋風)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>検索</button>
            </form>
            <ul style={styles.results}>
                {results.map((restaurant) => (
                    <li key={restaurant.id} style={styles.resultItem}>
                        {restaurant.name} - {restaurant.category}
                    </li>
                ))}
            </ul>
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
    results: {
        marginTop: '20px',
        listStyleType: 'none',
        padding: 0,
    },
    resultItem: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
    },
};

export default Search;
