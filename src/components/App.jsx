import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalogo from '../pages/Catalogo';
import ProductDetail from '../pages/ProductDetail';
import Register from '../pages/Register';
import Header from './Header';
import Footer from './Footer';
import CartWidget from './CartWidget';
import { useLocation } from 'react-router-dom';
import '../styles/StyleV2.css';

export default function App(){
  return (
    <BrowserRouter>
      <div className="app-root">
        <InnerLayout />
      </div>
    </BrowserRouter>
  );
}

function InnerLayout(){
  const location = useLocation();
  return (
    <>
      <Header />

      <main className="main-content">
        {/* mostrar carrito en todas las páginas excepto en /register */}
        {location.pathname !== '/register' && <CartWidget />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
