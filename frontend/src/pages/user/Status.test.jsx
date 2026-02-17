import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Status from './Status';

describe('Status Component', () => {
  it('debería renderizar el título de Status de Reportes', () => {
    render(<Status />);
    expect(screen.getByText('Status de Reportes')).toBeInTheDocument();
  });

  it('debería mostrar estado de reportes', () => {
    render(<Status />);
    expect(screen.getByText(/Reporte #1 - En revisión/i)).toBeInTheDocument();
    expect(screen.getByText(/Reporte #2 - Resuelto/i)).toBeInTheDocument();
  });

  it('h1 debería tener atributo tabIndex para enfoque', () => {
    const { container } = render(<Status />);
    const heading = container.querySelector('h1');
    expect(heading?.getAttribute('tabIndex')).toBe('-1');
  });

  it('debería tener párrafos con información de estado', () => {
    const { container } = render(<Status />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });

  it('texto debería contener números de reporte', () => {
    render(<Status />);
    const text = screen.getByText(/Reporte #1/i);
    expect(text).toBeInTheDocument();
  });
});
