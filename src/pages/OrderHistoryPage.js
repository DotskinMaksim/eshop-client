import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrderHistoryPage = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_URL}/orders/history/${userId}`);
                if (!response.ok) {
                    throw new Error('Tellimuste laadimine ebaõnnestus');
                }
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        } else {
            navigate('/login');
        }
    }, [userId, navigate]);

    if (loading) {
        return <p>{t('loading')}...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{t('my_orders')}</h2>
            {orders.length === 0 ? (
                <p style={styles.noOrdersText}>{t('you_have_no_orders')}.</p>
            ) : (
                <ul style={styles.orderList}>
                    {orders.map((order) => (
                        <li key={order.id} style={styles.orderItem}>
                            <h3 style={styles.orderTitle}>{t('order')} № {order.id} {t('by')} {order.date}</h3>
                            <p style={styles.totalPrice}>{t('total_cost')}: {order.totalPrice} €</p>
                            <h4 style={styles.productTitle}>{t('products')}:</h4>
                            <ul style={styles.productList}>
                                {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                                    order.items.map((item, index) => (
                                        <li key={item.name + item.quantity + index} style={styles.productItem}>
                                            {item.name} - {item.quantity} {item.unit === 'kg' ? t('kg') : t('pcs')} {/* Display kg for weight-based items */}
                                        </li>
                                    ))
                                ) : (
                                    <p style={styles.noProductsText}>{t('this_order_does_not_include_products')}.</p>
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    noOrdersText: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#888',
    },
    orderList: {
        listStyleType: 'none',
        padding: '0',
    },
    orderItem: {
        backgroundColor: '#fff',
        margin: '10px 0',
        padding: '15px',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    orderTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    totalPrice: {
        fontSize: '16px',
        color: '#666',
        marginTop: '5px',
    },
    productTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        marginTop: '10px',
    },
    productList: {
        listStyleType: 'none',
        padding: '0',
        margin: '10px 0 0 0',
    },
    productItem: {
        fontSize: '14px',
        color: '#555',
        padding: '5px 0',
    },
    noProductsText: {
        fontSize: '14px',
        color: '#888',
    },
};

export default OrderHistoryPage;
