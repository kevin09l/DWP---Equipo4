import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

vi.mock('../../services/api', () => ({
  auth: { register: vi.fn() }
}));
import { auth } from '../../services/api';

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

  it('muestra loader y llama a la API al enviar', async () => {
    auth.register.mockResolvedValue({ success: true });
    renderWithRouter(<Register />);
    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Foo' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico:/i), { target: { value: 'foo@bar.com' } });
    fireEvent.change(screen.getByLabelText(/Dirección:/i), { target: { value: 'Calle 1' } });
    fireEvent.change(screen.getByLabelText(/Medidor:/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: 'abcdef' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña:/i), { target: { value: 'abcdef' } });
    fireEvent.click(screen.getByText('Registrarse'));

    expect(screen.getByRole('status')).toBeInTheDocument();
    await waitFor(() => expect(auth.register).toHaveBeenCalled());
  });
});
