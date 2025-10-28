import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header', () => {
  it('muestra Wallet cuando la ruta NO es /register', () => {
    render(<MemoryRouter initialEntries={["/"]}><Header /></MemoryRouter>);
    // Wallet button tiene aria-label "Recargar saldo"
    const btn = screen.getByLabelText(/recargar saldo/i);
    expect(btn).not.toBeNull();
  });

  it('oculta Wallet cuando la ruta es /register', () => {
    render(<MemoryRouter initialEntries={["/register"]}><Header /></MemoryRouter>);
    const maybe = screen.queryByLabelText(/recargar saldo/i);
    expect(maybe).toBeNull();
  });
});
