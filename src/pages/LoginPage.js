import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const LoginPage = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/'); // Перенаправление на главную, если уже авторизован
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('https://localhost:7188/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, password: password }),
            credentials: 'include',
        });

        if (response.ok) {
            login(); // Вызов родительской функции для обновления состояния
            localStorage.setItem('authToken', 'user-token'); // Пример сохранения токена
            navigate('/'); // Перенаправление на главную
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={handleLogin} className={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Login</button>
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default LoginPage;
