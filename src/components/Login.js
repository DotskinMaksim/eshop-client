// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

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
            localStorage.setItem('userId', response.data.userId); // Запись userId в localStorage

            // Передача успешного логина в callback
            onSuccess(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred.');
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Имя пользователя</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
