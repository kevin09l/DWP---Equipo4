import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Reports from './Reports';

describe('Reports Component', () => {
  it('debería renderizar la página de reportes', () => {
    render(<Reports />);
    expect(screen.getByText('Reportes de Agua')).toBeInTheDocument();
  });

  it('debería mostrar descripción del formulario', () => {
    render(<Reports />);
    const description = screen.getByText(/Utiliza este formulario/i);
    expect(description).toBeInTheDocument();
  });

  it('debería contener campos de entrada requeridos', () => {
    const { container } = render(<Reports />);
    const labels = container.querySelectorAll('label');
    expect(labels.length).toBeGreaterThanOrEqual(3);
  });

  it('select de urgencia debería tener opciones', () => {
    render(<Reports />);
    const select = screen.getByDisplayValue('Selecciona una opción');
    expect(select).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(4);
  });

  it('debería mostrar botón de Realizar Reporte', () => {
    render(<Reports />);
    expect(screen.getByText('Realizar Reporte')).toBeInTheDocument();
  });

  it('textarea debería ser renderizado', () => {
    const { container } = render(<Reports />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('h2 debería tener atributo tabIndex para enfoque', () => {
    const { container } = render(<Reports />);
    const heading = container.querySelector('h2');
    expect(heading?.getAttribute('tabIndex')).toBe('-1');
  });
});
