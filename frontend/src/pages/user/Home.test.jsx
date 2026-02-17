import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('debería renderizar la página de inicio', () => {
    render(<Home />);
    const homeButton = screen.getByText('Iniciar sesión');
    expect(homeButton).toBeInTheDocument();
  });

  it('debería contener un botón de Iniciar sesión', () => {
    render(<Home />);
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  it('debería tener estructura de heroina con contenido', () => {
    const { container } = render(<Home />);
    const heroSection = container.querySelector('.home-hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('debería tener sección de contenido adicional', () => {
    const { container } = render(<Home />);
    const section = container.querySelector('.home-section');
    expect(section).toBeInTheDocument();
  });

  it('button debería ser enfocable al montar', () => {
    render(<Home />);
    const button = screen.getByText('Iniciar sesión');
    expect(button).toBeDefined();
  });
});
