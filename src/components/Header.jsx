import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Wallet from './Wallet';

export default function Header(){
  const location = useLocation();
  const hideWallet = location && location.pathname === '/register';

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <h1 className="logo">SkinTrade</h1>
        </Link>
        <nav className="nav">
          {/* Wallet shown in nav left of Catalog, but hidden on /register */}
          {!hideWallet && <Wallet className="wallet-in-nav" />}
          <Link to="/catalogo" className="nav-link">Catálogo</Link>
          <Link to="/register" className="nav-link">Inicio de sesión</Link>
        </nav>
      </div>
    </header>
  );
}
