import React from 'react';
import ProductsList from '../components/ProductList';

const HomePage = ({ addToCart }) => { // Добавляем props
    return (
        <div className="home-page">
            <h1>Products review</h1>
            <ProductsList addToCart={addToCart} /> {/* Передаем addToCart */}
        </div>
    );
};

export default HomePage;
