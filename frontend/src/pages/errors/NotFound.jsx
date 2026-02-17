import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      role="alert"
      aria-labelledby="title-404"
      style={{ padding: "40px", textAlign: "center" }}
    >
      <h1 id="title-404">404 — Página no encontrada</h1>

      <p>
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>

      <nav aria-label="Opciones de navegación">
        <Link to="/">Ir al inicio</Link>
      </nav>
    </main>
  );
}
