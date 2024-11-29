import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useTranslation } from 'react-i18next';

const LoginPage = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;
  const { t } = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem('userId');
        if (token) {
            navigate('/'); // Ümber suunamine, kui juba sisse logitud
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, password: password }),
        });

        if (response.ok) {
            const data = await response.json();
            const userId = data.userId; // Kasutaja ID saadakse vastusest

            if (userId) {
                localStorage.setItem('userId', userId); // Salvestame kasutaja ID localStorage
                login(); // Kutsume vanema funktsiooni, et värskendada seisundit
                navigate('/'); // Ümber suunamine peale sisse logimist
            } else {
                setError('Kasutaja ID-d ei leitud.');
            }
        } else {
            setError('Vale kasutajanimi või parool.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{t('log_in')}</h2>
            <form onSubmit={handleLogin} className={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('login')}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('password')}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>{t('log_in')}</button>
                <a href="register">{t('register')}</a>
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default LoginPage;
