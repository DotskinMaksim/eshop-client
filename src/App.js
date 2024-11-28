import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import OrderHistoryPage from './pages/OrderHistoryPage';


const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null); // Lisame userId

    const API_URL = process.env.REACT_APP_API_URL;


    // Laadime ostukorvi ja autentimise kontrolli
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart) {
            setCartItems(storedCart);
        }
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);

        if (token) {
            const storedUserId = localStorage.getItem('userId'); // Laadime userId
            setUserId(storedUserId); // Seame userId
        }
    }, []);

    // Salvestame ostukorvi localStorage'i, kui cartItems muutuvad
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Funktsioon kasutaja autentimiseks
    const login = () => {
        localStorage.setItem('authToken', 'user-token');
        localStorage.setItem('userId', 1); // Näide userId
        setIsAuthenticated(true);
        setUserId(1); // Seame userId sisselogimise ajal
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('cartItems');
        setIsAuthenticated(false);
        setCartItems([]);
        setUserId(null); // Eemaldame userId välja logides
    };

   const addToCart = (product) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);

        const totalQuantityInCart = existingItem ? existingItem.quantity + product.quantity : product.quantity;

        if (totalQuantityInCart > product.amountInStock) {
            alert(`Нельзя добавить товар в корзину. В наличии осталось только ${product.amountInStock - (existingItem?.quantity || 0)} единиц.`);
            return prevItems;
        }

        if (existingItem) {
            return prevItems.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: totalQuantityInCart }
                    : item
            );
        }

        return [...prevItems, { ...product, quantity: product.quantity }];
    });
};

   const removeFromCart = (id) => {
    setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
    });
};

   const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === id);

        if (!existingItem) {
            return prevItems; // Если товар не найден, возвращаем корзину без изменений
        }

        if (newQuantity > existingItem.amountInStock) {
            alert(`Вы не можете установить количество больше доступного. В наличии осталось только ${existingItem.amountInStock} единиц.`);
            return prevItems; // Если превышен лимит, не изменяем количество
        }

        return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
    });
};

    return (
        <Router>
            <Header
                isAuthenticated={isAuthenticated}
                logout={logout}
            />
            <Routes>
                <Route path="/" element={<HomePage addToCart={addToCart} />} />
                <Route
                  path="/cart"
                  element={
                    <CartPage
                      cartItems={cartItems}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                      setCartItems={setCartItems}
                      isAuthenticated={isAuthenticated}
                    />
                  }
                />
                <Route
                    path="/register"
                    element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/login" element={<LoginPage login={login} />} />
                <Route path="/order-history" element={<OrderHistoryPage userId={userId} />} /> {/* Anname userId */}
            </Routes>
        </Router>
    );
};

export default App;
