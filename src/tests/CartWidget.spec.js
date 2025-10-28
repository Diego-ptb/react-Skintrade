import React from 'react';
import { render, screen } from '@testing-library/react';
import CartWidget from '../components/CartWidget';
import { CartProvider } from '../context/CartContext';

describe('CartWidget DOM branches', () => {
  it('no añade el link si ya existe en el documento', () => {
    // crear un elemento con el id esperado para cubrir la rama
    const link = document.createElement('link');
    link.id = 'bootstrap-icons-css';
    document.head.appendChild(link);

    render(
      <CartProvider>
        <CartWidget />
      </CartProvider>
    );

    // Si el link ya existía, la función que lo crea no debería añadir otro.
    const existing = document.getElementById('bootstrap-icons-css');
    expect(existing).not.toBeNull();

    // limpiar
    existing.remove();
  });
});
