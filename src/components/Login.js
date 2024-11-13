// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

const Login = ({ onSuccess }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7188/api/auth/login', {
                userName,
                password,
            });

            // Сохранение userId в localStorage
            localStorage.setItem('userId', response.data.userId);

            // Передача успешного логина в callback
            onSuccess(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred.');
        }
    };
    console.log(styles);
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Вход</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Имя пользователя</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Войти</button>
            </form>
        </div>
    );
};

export default Login;
