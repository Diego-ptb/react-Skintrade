import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';

describe('Renderizado del componente Register', () => {
  it('debería mostrar el botón "Registrarse"', () => {
  render(<MemoryRouter><Register /></MemoryRouter>);
    const boton = screen.getByRole('button', { name: /registrarse/i });
    expect(boton).not.toBeNull(); // Jasmine compatible
  });

  it('debería mostrar el campo "Correo electrónico"', () => {
  render(<MemoryRouter><Register /></MemoryRouter>);
    const inputCorreo = screen.getByLabelText(/correo electrónico/i);
    expect(inputCorreo).not.toBeNull(); // Jasmine compatible
  });
});
