import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Загружаем корзину из localStorage при старте
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart) {
            setCartItems(storedCart);
        }
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    // Сохраняем корзину в localStorage при изменении cartItems
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Функция для авторизации пользователя
    const login = () => {
        localStorage.setItem('authToken', 'user-token');
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('cartItems');  // Очистка корзины из localStorage
        setIsAuthenticated(false);
        setCartItems([]);  // Очистка состояния корзины
    };

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
                <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} isAuthenticated={isAuthenticated} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage login={login} />} />
            </Routes>
        </Router>
    );
};

export default App;
