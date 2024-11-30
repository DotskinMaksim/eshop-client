import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Cart.module.css'; // Importing the CSS module

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const { t, i18n } = useTranslation();

    const handleQuantityChange = (id, value) => {
        if (value > 0) {
            updateQuantity(id, parseFloat(value));
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.pricePerUnit * item.quantity);
        }, 0).toFixed(2);
    };

    return (
        <div className={styles.cartContainer}>
            <h1>{t('cart')}</h1>
            {cartItems.length === 0 ? (
                <p>{t('cart_is_empty')}</p>
            ) : (
                cartItems.map((item) => {
                    // Debugging output to see the item data
                    console.log('Item data:', item);

                    // Dynamic name selection based on language
                    const itemName = item[`name${i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1)}`];
                    console.log('Selected item name:', itemName); // Debugging output

                    return (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemInfo}>
                                {/* Use dynamic name based on the current language */}
                                <h3>{itemName || 'No name available'}</h3> {/* Fallback message */}
                                <p>{t('price')}: €{(item.pricePerUnit * item.quantity).toFixed(2)}</p>
                                <div className={styles.quantitySelector}>
                                    {item.unit === "kg" ? (
                                        <>
                                            <span>{t('amount')}: </span>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0.1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            />
                                            <span>{t('kg')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t('amount')}: </span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1 > 0 ? item.quantity - 1 : 1)}>-</button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>{t('delete')}</button>
                        </div>
                    );
                })
            )}

            {cartItems.length > 0 && (
                <div className={styles.totalAmount}>
                    {t('total_amount')}: €{calculateTotal()}
                </div>
            )}
        </div>
    );
};

export default Cart;