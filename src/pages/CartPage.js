import React from 'react';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, removeFromCart, updateQuantity, isAuthenticated }) => {
    const navigate = useNavigate();

    // Calculate total sum from cart items
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.pricePerUnit * item.quantity, 0).toFixed(2);
    };

    const getPayment = async() => {
            const totalAmount = calculateTotal();

          try {
        // Call the payment API with the total amount
        const response = await fetch(`https://localhost:7188/api/Payment/${totalAmount}`);
        const data = await response.json();

        console.log('API Response:', data); // Log the response to see its structure

        if (data.paymentLink) {
            // Open the payment link in a new tab
            window.open(data.paymentLink, '_blank');
        } else {
            console.error('Payment link not received');
        }
    } catch (error) {
        console.error('Error during payment process:', error);
    }
    };

 const handleOrderClick = async () => {
    const userId = localStorage.getItem('authToken'); // Получаем ID пользователя из localStorage
    if (!userId) {
        console.error('User is not authenticated');
        return;
    }

    // Подготовка данных для запроса
    const orderData = {
        orderItems: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }))
    };

    try {
        // Отправка запроса на создание заказа с userId
        const response = await fetch(`https://localhost:7188/api/orders?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        console.log(data);

        if (data.order) {
            getPayment(); // Запуск процесса оплаты
        } else {
            console.error('Ошибка при создании заказа');
        }
    } catch (error) {
        console.error('Ошибка при процессе оплаты:', error);
    }
};

    return (
        <div>
            <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
            />
            {cartItems.length > 0 && isAuthenticated && (
                <button onClick={handleOrderClick}>Заказать</button>
            )}
        </div>
    );
};

export default CartPage;