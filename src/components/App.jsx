import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalogo from '../pages/Catalogo';
import Register from '../pages/Register';
import Header from './Header';
import Footer from './Footer';
import '../styles/StyleV2.css';

export default function App(){
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
