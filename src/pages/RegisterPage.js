// src/pages/RegisterPage.js
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// Стили для формы
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const Form = styled.form`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:focus {
        border-color: #007BFF;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`;

const Message = styled.p`
    text-align: center;
    color: #333;
`;

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { login } = useContext(AuthContext); // Получаем функцию login из контекста

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7188/api/Account/register', {
                username,
                firstName,
                lastName,
                password,
            });

            if (response.status === 200) {
                // Предполагается, что ваш API возвращает данные пользователя
                const userData = response.data;
                login(userData); // Входим в систему с данными пользователя
                setMessage('Registration successful! You are now logged in.');
            }
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Register</Title>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Register</Button>
                {message && <Message>{message}</Message>}
            </Form>
        </Container>
    );
};

export default RegisterPage;