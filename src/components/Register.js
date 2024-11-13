import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

const Register = ({ onSuccess }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7188/api/auth/register', {
                userName,
                password,
                firstName,
                lastName,
            });
            onSuccess(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Регистрация</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleRegister}>
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
                <div className={styles.formGroup}>
                    <label className={styles.label}>Имя</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Фамилия</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;
