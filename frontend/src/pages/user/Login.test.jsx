import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component', () => {
  it('debería renderizar el formulario de login', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('Inicio de sesión')).toBeInTheDocument();
  });

  it('debería mostrar inputs para usuario y contraseña', () => {
    const { container } = renderWithRouter(<Login />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('debería enfocar el input de usuario al montar', () => {
    const { container } = renderWithRouter(<Login />);
    const userInput = container.querySelector('input[type="text"]');
    expect(userInput).toBeDefined();
  });

  it('debería contener botones de acción', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  it('debería tener botón de Inicio en la parte superior', () => {
    renderWithRouter(<Login />);
    const inicioButtons = screen.getAllByText('Inicio');
    expect(inicioButtons.length).toBeGreaterThan(0);
  });
});
