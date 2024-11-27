import React from 'react';
import ProductsList from '../components/ProductList';

const HomePage = ({ addToCart }) => {
    return (
        <div className="home-page">
            <h1>Toodete ülevaade</h1>
            <ProductsList addToCart={addToCart} />
        </div>
    );
};

export default HomePage;
