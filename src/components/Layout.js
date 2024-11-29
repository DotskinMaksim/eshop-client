import React from 'react';
import Header from './Header';
import Footer from './Footer/Footer';
import './Layout.css';

const Layout = ({ children, isAuthenticated, logout }) => {
  return (
    <div className="layout">
      <Header isAuthenticated={isAuthenticated} logout={logout} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;