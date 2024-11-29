import React from 'react';
import './Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} DotShop {t('online_store')}. Maksim Dotskin | TARpv22.</p>
        <ul className="footer-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;