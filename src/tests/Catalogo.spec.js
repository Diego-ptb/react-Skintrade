import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Catalogo from '../pages/Catalogo';
import CartWidget from '../components/CartWidget';

describe('Catálogo y Carrito', () => {
  it('debería renderizar productos en el catálogo', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Catalogo />
          <CartWidget />
        </CartProvider>
      </MemoryRouter>
    );
    const titulo = screen.getByText(/escoge un producto/i);
    expect(titulo).not.toBeNull();
  });

  it('debería mostrar el carrito en la página', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Catalogo />
          <CartWidget />
        </CartProvider>
      </MemoryRouter>
    );
    const elementos = screen.getAllByText(/carrito/i);
    expect(elementos.length).toBeGreaterThan(0);
  });

  it('debería contener un botón para vaciar el carrito', () => {
    // seed localStorage so CartProvider initializes with one item and the "Vaciar carrito" button appears
    localStorage.setItem('skintrade_cart_v1', JSON.stringify([{ tituloProducto: 'Test Item', precioProducto: 100, imagenProducto: '/images/pistola1.webp' }]));
    render(
      <MemoryRouter>
        <CartProvider>
          <Catalogo />
          <CartWidget />
        </CartProvider>
      </MemoryRouter>
    );
    const boton = screen.getByText(/vaciar carrito/i);
    expect(boton).not.toBeNull();
  });
});
