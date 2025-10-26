import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import Catalogo from '../pages/Catalogo';

describe('Catálogo y Carrito', () => {
  it('debería renderizar productos en el catálogo', () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
    const titulo = screen.getByText(/escoge un producto/i);
    expect(titulo).not.toBeNull();
  });

  it('debería mostrar el carrito en la página', () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
    const elementos = screen.getAllByText(/carrito/i);
    expect(elementos.length).toBeGreaterThan(0);
  });

  it('debería contener un botón para vaciar el carrito', () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
    const boton = screen.getByText(/vaciar carrito/i);
    expect(boton).not.toBeNull();
  });
});
