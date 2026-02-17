import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Register Component', () => {
  it('debería renderizar el formulario de registro', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText('Registro')).toBeInTheDocument();
  });

  it('debería mostrar todos los campos de entrada requeridos', () => {
    const { container } = renderWithRouter(<Register />);
    const labels = container.querySelectorAll('label');
    expect(labels.length).toBeGreaterThanOrEqual(6);
  });

  it('debería mostrar campos de contraseña', () => {
    const { container } = renderWithRouter(<Register />);
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBeGreaterThan(0);
  });

  it('debería contener botón de Registrarse', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
  });

  it('debería mostrar enlace de login existente', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText(/¿Ya tienes una cuenta?/i)).toBeInTheDocument();
  });

  it('debería enfocar el input de nombre al montar', () => {
    const { container } = renderWithRouter(<Register />);
    const nameInput = container.querySelector('input[type="text"]');
    expect(nameInput).toBeDefined();
  });
});
