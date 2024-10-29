import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
    return (
        <div>
            <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity} // Now updateQuantity is passed correctly
            />
        </div>
    );
};

export default CartPage;
