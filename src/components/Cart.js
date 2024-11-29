import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const CartContainer = styled.div`
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;  /* Increased gap between quantity text and buttons */

  input {
    width: 60px;
    height: 30px;
    text-align: center;
    font-size: 16px;
    margin: 0 10px;
  }

  span {
    font-size: 16px;
    margin-right: 10px;
  }

  button {
    background-color: #4caf50; 
    color: white;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;  /* Darker green on hover */
    }
  }
`;

const RemoveButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ff4500;
  }
`;

const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: right;
`;

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const { t } = useTranslation();
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
        <CartContainer>
            <h1>{t('cart')}</h1>
            {cartItems.length === 0 ? (
                <p>{t('cart_is_empty')}</p>
            ) : (
                cartItems.map((item) => (
                    <CartItem key={item.id}>
                        <ItemInfo>
                            <h3>{item.name}</h3>
                            <p>{t('price')}: €{(item.pricePerUnit * item.quantity).toFixed(2)}</p>
                            <QuantitySelector>
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
                            </QuantitySelector>
                        </ItemInfo>
                        <RemoveButton onClick={() => removeFromCart(item.id)}>{t('delete')}</RemoveButton>
                    </CartItem>
                ))
            )}

            {cartItems.length > 0 && (
                <TotalAmount>
                    {t('total_amount')}: €{calculateTotal()}
                </TotalAmount>
            )}
        </CartContainer>
    );
};

export default Cart;
