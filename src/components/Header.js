// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { checkAuth, logout } from '../utils/auth';

const HeaderContainer = styled.header`
  background: #4a90e2;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = ({ isAuthenticated, logout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate('/'); // Suunatakse pärast väljalogimist avalehele
        }
    };

    return (
        <HeaderContainer>
            <h1 style={{ color: 'white' }}>Minu Rakendus</h1> {/* "My App" on tõlgitud kui "Minu Rakendus" */}
            <Nav>
                <NavLink to="/">Avaleht</NavLink> {/* "Home" → "Avaleht" */}
                <NavLink to="/cart">Ostukorv</NavLink> {/* "Корзина" → "Ostukorv" */}
                {isAuthenticated ? (
                    <>
                        <NavLink to="/order-history">Tellimuste ajalugu</NavLink> {/* "История заказов" → "Tellimuste ajalugu" */}
                        <NavLink to="#" onClick={handleLogout}>Logi välja</NavLink> {/* "Выйти" → "Logi välja" */}
                    </>
                ) : (
                    <>
                        <NavLink to="/register">Registreeru</NavLink> {/* "Регистр" → "Registreeru" */}
                        <NavLink to="/login">Logi sisse</NavLink> {/* "Логин" → "Logi sisse" */}
                    </>
                )}
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
