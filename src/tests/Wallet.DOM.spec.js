import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import Wallet from '../components/Wallet';

const BALANCE_KEY = 'skintrade_balance_v1';

describe('Wallet - DOM', () => {
  beforeEach(() => {
    localStorage.removeItem(BALANCE_KEY);
  });

  it('muestra el saldo inicial desde localStorage si existe', () => {
    localStorage.setItem(BALANCE_KEY, '12345');
    render(<Wallet />);

    // El componente añade un title con el saldo sin formato
    const box = screen.getByTitle(/Saldo disponible:\s*12345/);
    expect(box).not.toBeNull();

    // Comprueba que el monto formateado (con separador) está en el DOM
    const amountEl = screen.getByText(/12.345|12345/);
    expect(amountEl).not.toBeNull();
  });

  it('muestra el botón de recarga y abre el modal al hacer click', async () => {
    render(<Wallet />);
    const openBtn = screen.getByLabelText(/Recargar saldo/i);
    expect(openBtn).not.toBeNull();

  // Al hacer click debe aparecer un diálogo/modal (hacer click y esperar findByRole)
  fireEvent.click(openBtn);
  const dialog = await screen.findByRole('dialog');
  expect(dialog).not.toBeNull();
  // El dialog debe contener el título del formulario
  const title = within(dialog).getByText(/Recargar saldo/i);
  expect(title).not.toBeNull();
  });
});
