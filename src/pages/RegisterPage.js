import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/'); // Перенаправление на главную, если уже авторизован
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Проверка на совпадение паролей
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const response = await fetch('https://localhost:7188/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, password: password, email: email }),
            credentials: 'include',
        });

        // Проверка статуса ответа и типов контента
        if (response.ok) {
            try {
                const data = await response.json();  // Парсим только если ответ успешен
                navigate('/login'); // Перенаправление на страницу логина после успешной регистрации
            } catch (e) {
                // Логирование ошибки для диагностики
                setError('Failed to parse response as JSON: ' + e.message);
            }
        } else {
            const errorText = await response.text();
            setError(errorText || 'Registration failed.');
        }
    };



    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Register</h2>
            <form onSubmit={handleRegister} className={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className={styles.input}
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>Register</button>
                <a href="login">Log in</a>

            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default RegisterPage;
