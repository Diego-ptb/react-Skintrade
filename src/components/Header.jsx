import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">SkinTrade</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/catalogo" className="nav-link">Catálogo</Link>
          <Link to="/register" className="nav-link">Inicio de sesión</Link>
        </nav>
      </div>
    </header>
  );
}
