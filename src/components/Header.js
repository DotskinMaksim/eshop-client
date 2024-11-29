import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css'; // Importing the CSS module
import '../i18n'; // i18n configuration
import { useTranslation } from 'react-i18next';

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
    <header className={styles.headerContainer}>
      <h1 style={{ color: 'white' }}>{t('app_name')}</h1> {/* Translate app name */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>{t('home')}</Link> {/* Translate Home */}
        <Link to="/cart" className={styles.navLink}>{t('cart')}</Link> {/* Translate Cart */}
        {isAuthenticated ? (
          <>
            <Link to="/order-history" className={styles.navLink}>{t('my_orders')}</Link> {/* Translate My Orders */}
            <Link to="#" className={styles.navLink} onClick={handleLogout}>{t('log_out')}</Link> {/* Translate Log Out */}
          </>
        ) : (
          <>
            <Link to="/register" className={styles.navLink}>{t('register')}</Link> {/* Translate Register */}
            <Link to="/login" className={styles.navLink}>{t('log_in')}</Link> {/* Translate Log In */}
          </>
        )}
      </nav>

      {/* Language selector dropdown */}
      <div>
        <select
          className={styles.languageSelect}
          onChange={handleLanguageChange}
          value={localStorage.getItem('language') || 'en'} // Set the value based on localStorage
        >
          <option value="en">English</option>
          <option value="et">Eesti</option>
          <option value="ru">Русский</option>
        </select>
      </div>
    </header>
  );
};

export default Header;