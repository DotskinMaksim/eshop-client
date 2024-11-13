import React from 'react';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();

    const handleOrderClick = () => {
        // Переход на страницу заказа и передача данных корзины
        navigate('/order', { state: { cartItems } });
    };

    return (
        <div>
            <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
            />
            {/* Кнопка "Заказать" отображается только если корзина не пуста */}
            {cartItems.length > 0 && (
                <button onClick={handleOrderClick}>Заказать</button>
            )}
        </div>
    );
};

export default CartPage;
