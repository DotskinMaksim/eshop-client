import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Функция для авторизации пользователя
    const login = () => {
        // Здесь можно добавить логику аутентификации (например, проверку через API или localStorage)
        localStorage.setItem('authToken', 'user-token');  // Для примера, сохраняем токен в localStorage
        setIsAuthenticated(true);
    };

    // Функция для выхода из аккаунта
    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    // Проверка статуса аутентификации при загрузке
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: product.quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <Router>
            <Header
                isAuthenticated={isAuthenticated}
                logout={logout}
            />
            <Routes>
                <Route path="/" element={<HomePage addToCart={addToCart} />} />
                <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage login={login} />} />
            </Routes>
        </Router>
    );
};

export default App;
