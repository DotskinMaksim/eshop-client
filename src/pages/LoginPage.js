// pages/LoginPage.js
import React, { useState } from 'react';
import Login from '../components/Login';

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleSuccess = (data) => {
        setIsLoggedIn(true);
        setUserId(data.userId);  // Сохраняем userId
        alert('Успешный вход!');
    };

    return (
        <div>
            {!isLoggedIn ? (
                <Login onSuccess={handleSuccess} />
            ) : (
                <div>
                    <h2>Добро пожаловать, пользователь {userId}!</h2>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
