import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <main
      role="alert"
      aria-labelledby="title-500"
      style={{ padding: "40px", textAlign: "center" }}
    >
      <h1 id="title-500">500 — Error del servidor</h1>

      <p>
        Ocurrió un problema interno. Nuestro equipo ya fue notificado.
      </p>

      <p>
        Puedes intentar más tarde o volver al inicio.
      </p>

      <nav aria-label="Opciones disponibles">
        <Link to="/">Volver al inicio</Link>
      </nav>
    </main>
  );
}
