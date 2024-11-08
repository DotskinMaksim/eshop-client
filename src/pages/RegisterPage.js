// pages/RegisterPage.js
import React from 'react';
import Register from '../components/Register';

const RegisterPage = () => {
    const handleSuccess = (message) => {
        alert(message);
    };

    return (
        <div>
            <Register onSuccess={handleSuccess} />
        </div>
    );
};

export default RegisterPage;
