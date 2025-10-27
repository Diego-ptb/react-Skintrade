import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Wallet from '../components/Wallet';

const BALANCE_KEY = 'skintrade_balance_v1';

describe('Wallet - Lógica', () => {
  beforeEach(() => {
    // limpiar localStorage antes de cada test
    localStorage.removeItem(BALANCE_KEY);
  });

  it('permite recargar el saldo mediante el modal y actualiza localStorage', () => {
    // Cuando no hay nada en localStorage, el componente inicia con 50000
    render(<Wallet />);

    // Abrir modal
    const openBtn = screen.getByLabelText(/Recargar saldo/i);
    fireEvent.click(openBtn);

    // El modal debe aparecer
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toBeNull();

    // Llenar el formulario con datos válidos
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), { target: { value: 'Perez' } });
    fireEvent.change(screen.getByPlaceholderText(/RUT/i), { target: { value: '12345678-9' } });
    fireEvent.change(screen.getByPlaceholderText(/Número de tarjeta/i), { target: { value: '4242424242424242' } });
    fireEvent.change(screen.getByPlaceholderText(/MM\/YY/i), { target: { value: '12/50' } });
    fireEvent.change(screen.getByPlaceholderText(/CVV/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Monto a recargar/i), { target: { value: '1000' } });

    // Enviar formulario: buscar el botón dentro del diálogo (evita confundir con el '+')
    const submit = within(dialog).getByRole('button', { name: /Recargar/i });
    fireEvent.click(submit);

    // Comprobamos que localStorage se actualizó (50000 + 1000 = 51000)
    const stored = Number(localStorage.getItem(BALANCE_KEY));
    expect(stored).toBe(51000);
  });

  it('valida campos inválidos y no actualiza el saldo', () => {
    render(<Wallet />);
    const openBtn = screen.getByLabelText(/Recargar saldo/i);
    fireEvent.click(openBtn);
    const dialog = screen.getByRole('dialog');

    // Dejar campos vacíos y enviar
    const submit = within(dialog).getByRole('button', { name: /Recargar/i });
    fireEvent.click(submit);

    // No debe actualizar localStorage (permanece undefined o balance por defecto existente)
    const stored = localStorage.getItem(BALANCE_KEY);
    // Si no existía antes, wallet inicializa con 50000; la recarga inválida no debe cambiarlo
    expect(stored === null || Number(stored) === 50000).toBeTrue();
  });
});
