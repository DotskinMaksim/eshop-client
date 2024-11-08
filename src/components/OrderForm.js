// components/OrderForm.js
import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            alert("Пожалуйста, примите лицензионное соглашение.");
            return;
        }

        // Передаем данные родительскому компоненту через onSubmit
        onSubmit({ email, password, acceptedTerms });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Пароль:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    Я принимаю лицензионное соглашение
                </label>
            </div>
            <button type="submit">Начать платеж</button>
        </form>
    );
};

export default OrderForm;
