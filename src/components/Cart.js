import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px 0;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
`;

const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {

    const handleQuantityChange = (id, value) => {
        if (value > 0) {
            updateQuantity(id, parseFloat(value));
        }
    };

    // Вычисление общей суммы корзины
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.pricePerUnit * item.quantity);
        }, 0).toFixed(2);
    };

    return (
        <CartContainer>
            <h1>Корзина</h1>
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                cartItems.map((item) => (
                    <CartItem key={item.id}>
                        <div>
                            <h3>{item.name}</h3>
                            <p>Цена: €{(item.pricePerUnit * item.quantity).toFixed(2)}</p>
                            <QuantitySelector>
                                {item.unit === "kg" ? (
                                    <>
                                        <span>Количество: </span>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        />
                                        <span>кг</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Количество: </span>

                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1 > 0 ? item.quantity - 1 : 1)}>-</button>
                                    </>
                                )}
                            </QuantitySelector>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                    </CartItem>
                ))
            )}

            {cartItems.length > 0 && (
                <TotalAmount>
                    Общая сумма: €{calculateTotal()}
                </TotalAmount>
            )}
        </CartContainer>
    );
};

export default Cart;
