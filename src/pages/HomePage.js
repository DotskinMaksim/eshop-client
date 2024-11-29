import React from 'react';
import ProductsList from '../components/ProductList';
import { useTranslation } from 'react-i18next';

const HomePage = ({ addToCart }) => {

    const { t } = useTranslation(); // Используем хук для получения функции t (перевод)
    return (
        <div className="home-page">
            {/*<h1>{t('test')}</h1>*/}
            <ProductsList addToCart={addToCart} />
        </div>
    );
};

export default HomePage;
