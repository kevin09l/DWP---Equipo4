import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Schedule from './Schedule';

describe('Schedule Component', () => {
  it('debería renderizar la página de horarios', () => {
    render(<Schedule />);
    expect(screen.getByText('Horarios')).toBeInTheDocument();
  });

  it('debería mostrar filtro de zona/colonia', () => {
    const { container } = render(<Schedule />);
    const label = container.querySelector('label');
    expect(label?.textContent).toContain('Colonia');
  });

  it('select de zona debería tener opciones', () => {
    render(<Schedule />);
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(4);
  });

  it('debería renderizar tabla de horarios', () => {
    const { container } = render(<Schedule />);
    const table = container.querySelector('.schedule-table');
    expect(table).toBeInTheDocument();
  });

  it('tabla debería incluir días de la semana', () => {
    render(<Schedule />);
    expect(screen.getByText('Lunes')).toBeInTheDocument();
    expect(screen.getByText('Viernes')).toBeInTheDocument();
    expect(screen.getByText('Sábado')).toBeInTheDocument();
  });

  it('debería mostrar bloques de tiempo', () => {
    render(<Schedule />);
    expect(screen.getByText(/7:00 - 9:00/i)).toBeInTheDocument();
    expect(screen.getByText(/13:00 - 15:00/i)).toBeInTheDocument();
  });

  it('h2 debería tener atributo tabIndex', () => {
    const { container } = render(<Schedule />);
    const heading = container.querySelector('h2');
    expect(heading?.getAttribute('tabIndex')).toBe('-1');
  });
});
