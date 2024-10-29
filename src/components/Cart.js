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

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
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
                            <p>Цена: €{(item.price * 1.20).toFixed(2)}</p>
                            <QuantitySelector>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1 > 0 ? item.quantity - 1 : 1)}>-</button>
                            </QuantitySelector>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                    </CartItem>
                ))
            )}
        </CartContainer>
    );
};

export default Cart;
