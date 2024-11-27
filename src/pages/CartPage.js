import React, { useState } from 'react';
import Cart from '../components/Cart';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
  }

  button {
    margin: 10px 0;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;  /* Make buttons the same width */
    font-size: 16px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #e53935;
  }
`;

const LoginPrompt = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: #555;
`;

const OrderDiv = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: #555;
`;

const StyledNavLink = styled(NavLink)`
  color: #2196f3;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const CartPage = ({ cartItems, removeFromCart, updateQuantity, isAuthenticated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.pricePerUnit * item.quantity, 0).toFixed(2);
    };

    const getPayment = async () => {
        const totalAmount = calculateTotal();

        try {
            const response = await fetch(`https://localhost:7188/api/Payment/${totalAmount}`);
            const data = await response.json();

            console.log('API Response:', data);

            if (data.paymentLink) {
                window.open(data.paymentLink, '_blank');
            } else {
                console.error('Makselink ei laetud');
            }
        } catch (error) {
            console.error('Viga makseprotsessis:', error);
        }
    };

    const handleOrderClick = () => {
        setIsModalOpen(true);
        getPayment();
    };

    const handleConfirmPayment = async () => {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('Kasutaja ei ole autentitud');
            setIsProcessing(false);
            return;
        }

        const totalAmount = calculateTotal();
        const orderData = {
            totalPrice: parseFloat(totalAmount),
            orderItems: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const response = await fetch(`https://localhost:7188/api/orders?userId=${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (data.order) {
                console.log('Tellimus loodud edukalt:', data.order);
                localStorage.removeItem('cartItems');
                setIsProcessing(false);
                setIsModalOpen(false);
                window.location.reload();
            } else {
                console.error('Viga tellimuse loomisel');
            }
        } catch (error) {
            console.error('Viga tellimuse töötlemisel:', error);
        }
    };

    const handleCancelOrder = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
            {cartItems.length > 0 && isAuthenticated && (
                <OrderDiv>
                    <Button onClick={handleOrderClick}>Telli</Button>
                </OrderDiv>
            )}
            {cartItems.length > 0 && !isAuthenticated && (
                <LoginPrompt>
                    <p>Logige sisse, et tellida</p>
                    <StyledNavLink to="/login">Logi sisse</StyledNavLink>
                </LoginPrompt>
            )}

            {isModalOpen && (
                <Modal>
                    <ModalContent>
                        {isProcessing ? (
                            <p>Kontrollimine...</p>
                        ) : (
                            <>
                                <h3>Tellimuse kinnitamine</h3>
                                <ConfirmButton onClick={handleConfirmPayment}>Tellimus makstud</ConfirmButton>
                                <CancelButton onClick={handleCancelOrder}>Tühista tellimus</CancelButton>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default CartPage;
