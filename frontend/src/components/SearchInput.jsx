import { useRef } from "react";

export default function SearchInput({ 
  placeholder = "Buscar...", 
  onSearch = () => {} 
}) {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "14px",
          flex: 1,
        }}
      />
      <button
        aria-label="Enfocar campo de búsqueda"
        onClick={handleFocus}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Enfocar
      </button>
      <button
        aria-label="Limpiar búsqueda"
        onClick={handleClear}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Limpiar
      </button>
    </div>
  );
}
