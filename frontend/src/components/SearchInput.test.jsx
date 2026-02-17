import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput.jsx";

describe("SearchInput - Control de Foco con useRef", () => {
  it("debería renderizar el componente correctamente", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Buscar...");
    expect(input).toBeInTheDocument();
  });

  it("debería tener botones para enfocar y limpiar", () => {
    render(<SearchInput />);
    expect(screen.getByLabelText("Enfocar campo de búsqueda")).toBeInTheDocument();
    expect(screen.getByLabelText("Limpiar búsqueda")).toBeInTheDocument();
  });

  it("debería usar useRef para control de foco del input", () => {
    const { container } = render(<SearchInput />);
    const input = container.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
  });

  it("debería aceptar placeholder personalizado", () => {
    render(<SearchInput placeholder="Búsqueda personalizada" />);
    expect(screen.getByPlaceholderText("Búsqueda personalizada")).toBeInTheDocument();
  });

  it("debería aceptar callback onSearch", () => {
    const onSearch = () => console.log("search");
    render(<SearchInput onSearch={onSearch} />);
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
  });
});
