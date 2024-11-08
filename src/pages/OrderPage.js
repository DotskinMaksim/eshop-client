// pages/OrderPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Получаем данные корзины из переданного состояния
    const { cartItems } = location.state || { cartItems: [] };

    const handleOrderSubmit = async (orderData) => {
        try {
            // Формируем данные для отправки заказа на сервер
            const orderPayload = {
                orderDto: {
                    userId: 1, // Используйте реальный ID пользователя
                    isPaid: false,
                    orderItems: cartItems.map(item => ({
                        productId: item.id,
                        quantity: Math.round(item.quantity), // Приводим к целому числу
                        unit: item.unit,
                        pricePerUnit: item.pricePerUnit,
                    })),
                    email: orderData.email,
                    password: orderData.password,
                    acceptedTerms: orderData.acceptedTerms,
                }
            };

            // Отправляем данные заказа на сервер
            const response = await fetch('https://localhost:7188/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload),
            });

            if (response.ok) {
                const result = await response.json();
                alert("Заказ успешно оформлен!");

                // Переход на страницу оплаты, используя сумму заказа
                const paymentLink = await initiatePayment(result.totalOrderPrice);
                if (paymentLink) {
                    window.location.href = paymentLink;
                }
            } else {
                alert("Ошибка оформления заказа.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при выполнении запроса.");
        }
    };

    const initiatePayment = async (sum) => {
        try {
            const response = await fetch(`https://localhost:7188/api/payment/${sum}`);
            if (response.ok) {
                const paymentLink = await response.json();
                return paymentLink;
            }
            return null;
        } catch (error) {
            console.error("Ошибка платежа:", error);
            return null;
        }
    };

    return (
        <div>
            <h2>Оформление заказа</h2>
            <OrderForm onSubmit={handleOrderSubmit} />
        </div>
    );
};

export default OrderPage;
