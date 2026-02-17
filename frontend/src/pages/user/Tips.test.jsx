import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tips from './Tips';

describe('Tips Component', () => {
  it('debería renderizar la página de consejos', () => {
    render(<Tips />);
    expect(screen.getByText('Consejos de cuidados contra el agua')).toBeInTheDocument();
  });

  it('debería mostrar todos los consejos principales', () => {
    render(<Tips />);
    expect(screen.getByText('1. Repara Fugas')).toBeInTheDocument();
    expect(screen.getByText('2. Usa el Agua de Manera Eficiente')).toBeInTheDocument();
    expect(screen.getByText('3. Riega las Plantas de Manera Inteligente')).toBeInTheDocument();
  });

  it('debería contener descripción de "Repara Fugas"', () => {
    render(<Tips />);
    const text = screen.getByText(/Asegúrate de reparar cualquier fuga/i);
    expect(text).toBeInTheDocument();
  });

  it('debería contener descripción de "Usa el Agua de Manera Eficiente"', () => {
    render(<Tips />);
    const text = screen.getByText(/Toma duchas más cortas/i);
    expect(text).toBeInTheDocument();
  });

  it('debería contener descripción de "Riega las Plantas"', () => {
    render(<Tips />);
    const text = screen.getByText(/Riega tus plantas en las horas más frescas/i);
    expect(text).toBeInTheDocument();
  });

  it('debería renderizar elementos con clase tip-item', () => {
    const { container } = render(<Tips />);
    const tipItems = container.querySelectorAll('.tip-item');
    expect(tipItems.length).toBe(3);
  });

  it('h2 debería tener atributo tabIndex', () => {
    const { container } = render(<Tips />);
    const heading = container.querySelector('h2');
    expect(heading?.getAttribute('tabIndex')).toBe('-1');
  });
});
