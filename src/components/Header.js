// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Header = () => {
    return (
        <HeaderContainer>
            <h1 style={{ color: 'white' }}>My App</h1>
            <Nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cart">Корзина</NavLink>
                <NavLink to="/register">Регистр</NavLink>
                <NavLink to="/login">Логин</NavLink>

            </Nav>
        </HeaderContainer>
    );
};

export default Header;
