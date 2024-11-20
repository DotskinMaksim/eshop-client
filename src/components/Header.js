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
            navigate('/'); // Перенаправляем на главную страницу после выхода
        }
    };

    return (
        <HeaderContainer>
            <h1 style={{ color: 'white' }}>My App</h1>
            <Nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cart">Корзина</NavLink>
                {isAuthenticated ? (
                    <>
                        <NavLink to="#" onClick={handleLogout}>Выйти</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/register">Регистр</NavLink>
                        <NavLink to="/login">Логин</NavLink>
                    </>
                )}
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
