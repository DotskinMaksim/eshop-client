import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
  const { t } = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/'); // Ümber suunamine, kui juba sisse logitud
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Paroolide kokkulangevuse kontroll
        if (password !== confirmPassword) {
            setError('Paroolid ei kattu.');
            return;
        }

        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, password: password, email: email }),
            credentials: 'include',
        });

        // Kontrollige vastuse staatust ja sisu tüüpe
        if (response.ok) {
            try {
                const data = await response.json();  // Parssime ainult siis, kui vastus on edukas
                navigate('/login'); // Ümber suunamine pärast edukat registreerimist
            } catch (e) {
                // Vigade logimine diagnostika jaoks
                setError('Ei õnnestunud vastust JSON-i formaadis parssida: ' + e.message);
            }
        } else {
            const errorText = await response.text();
            setError(errorText || 'Registreerimine ebaõnnestus.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{t('register')}</h2>
            <form onSubmit={handleRegister} className={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('login')}
                    required
                    className={styles.input}
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('email')}
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('confirm_password')}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>{t('register')}</button>
                <a href="login">{t('log_in')}</a>
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default RegisterPage;
