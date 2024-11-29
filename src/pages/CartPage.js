import React, { useState } from 'react';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
`;

const ConfirmButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }
`;
const OrderBtnDiv = styled.div`
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
const CartPage = ({ cartItems, removeFromCart, updateQuantity, setCartItems, isAuthenticated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentWindow, setPaymentWindow] = useState(null);  // Manage window state
  const [intervalId, setIntervalId] = useState(null);  // Manage interval state
  const navigate = useNavigate();

  const { t } = useTranslation();
  const API_URL = process.env.REACT_APP_API_URL;

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.pricePerUnit * item.quantity, 0).toFixed(2);
  };

  const createOrder = async (cartItems, calculateTotal, setIsProcessing, setIsModalOpen) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User is not authenticated');
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
      const response = await fetch(`${API_URL}/orders?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.order) {
        console.log('Order created successfully:', data.order);
      } else {
        console.error('Error creating order');
      }
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotal();
    let paymentWindowInstance = null;
    let intervalInstance = null;

    try {
      const response = await fetch(`${API_URL}/Payment/${totalAmount}`);
      if (!response.ok) throw new Error('Payment initiation failed');

      const link = await response.json();
      paymentWindowInstance = window.open(link, '_blank');
      setPaymentWindow(paymentWindowInstance); // Save the payment window to state
      setIsProcessing(true);
      setIsModalOpen(true);

      intervalInstance = setInterval(async () => {
        try {
          const statusResponse = await fetch(link);
          const status = await statusResponse.json();

          if (status.state === 'completed') {
            await createOrder(cartItems, calculateTotal, setIsProcessing, setIsModalOpen);

            clearInterval(intervalInstance);
            paymentWindowInstance?.close();
            setIsProcessing(false);
            setCartItems([]);
            localStorage.removeItem('cartItems');
            setPaymentStatus('success');
          } else if (status.state === 'failed') {
            clearInterval(intervalInstance);
            paymentWindowInstance?.close();
            setIsProcessing(false);
            setPaymentStatus('failed');
            setTimeout(() => {
              setIsModalOpen(false);
              setPaymentStatus('');
            }, 2000);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }, 3000);

      setIntervalId(intervalInstance); // Save the interval to state

    } catch (error) {
      console.error('Payment error:', error);
      paymentWindowInstance?.close();
    }
  };

  const handleCancelPayment = () => {
    if (paymentWindow) paymentWindow.close();
    if (intervalId) clearInterval(intervalId);
    setIsProcessing(false);
    setPaymentStatus('failed');
    setIsModalOpen(false);

  };

  return (
    <div>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      {cartItems.length > 0 && isAuthenticated && (
        <OrderBtnDiv>
          <Button onClick={handlePayment}>{t('make_an_order')}</Button>
        </OrderBtnDiv>
      )}
      {cartItems.length > 0 && !isAuthenticated && (
        <OrderBtnDiv>
          <p>{t('log_in_to_make_an_order')}</p>
          <StyledNavLink to="/login">{t('log_in')}</StyledNavLink>
        </OrderBtnDiv>
      )}

      {isModalOpen && (
        <Modal>
          <ModalContent>
            {isProcessing ? (
              <>
                <p>{t('processing_payment')}...</p>
                <CancelButton onClick={handleCancelPayment}>{t('cancel_payment')}</CancelButton>
              </>
            ) : paymentStatus === 'success' ? (
              <>
                <p>{t('payment_successful')}! {t('order_created')}.</p>
                <ConfirmButton onClick={() => navigate('/')}>{t('go_to_home')}</ConfirmButton>
              </>
            ) : paymentStatus === 'failed' && (
              <p>{t('payment_canceled')}.</p>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default CartPage;