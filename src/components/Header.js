import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../i18n'; // i18n configuration
import { useTranslation } from 'react-i18next';

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

const LanguageSelect = styled.select`
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  border-radius: 5px;
`;

const Header = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Initialize the language from localStorage or default to 'en'
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage); // Set the language if it's in localStorage
    } else {
      localStorage.setItem('language', 'et'); // Default language
      i18n.changeLanguage('et');
    }
  }, [i18n]);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/'); // Redirect to home page after logout
    }
  };

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang); // Change the language using i18n
    localStorage.setItem('language', selectedLang); // Store the selected language in localStorage
  };

  return (
    <HeaderContainer>
      <h1 style={{ color: 'white' }}>{t('app_name')}</h1> {/* Translate app name */}
      <Nav>
        <NavLink to="/">{t('home')}</NavLink> {/* Translate Home */}
        <NavLink to="/cart">{t('cart')}</NavLink> {/* Translate Cart */}
        {isAuthenticated ? (
          <>
            <NavLink to="/order-history">{t('my_orders')}</NavLink> {/* Translate My Orders */}
            <NavLink to="#" onClick={handleLogout}>{t('log_out')}</NavLink> {/* Translate Log Out */}
          </>
        ) : (
          <>
            <NavLink to="/register">{t('register')}</NavLink> {/* Translate Register */}
            <NavLink to="/login">{t('log_in')}</NavLink> {/* Translate Log In */}
          </>
        )}
      </Nav>

      {/* Language selector dropdown */}
      <div>
<LanguageSelect
          onChange={handleLanguageChange}
          value={localStorage.getItem('language') || 'en'} // Set the value based on localStorage
        >          <option value="en">English</option>
          <option value="et">Eesti</option>
          <option value="ru">Русский</option>
        </LanguageSelect>
      </div>
    </HeaderContainer>
  );
};

export default Header;