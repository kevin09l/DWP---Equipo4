import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Iniciar Sesión</h1>

      <div>
        <label>Usuario o correo</label>
        <br />
        <input type="text" />
      </div>

      <br />

      <div>
        <label>Contraseña</label>
        <br />
        <input type="password" />
      </div>

      <br />

      <button onClick={() => navigate("/home")}>
        Iniciar sesión
      </button>

      <button onClick={() => navigate("/register")}>
        Registrarse
      </button>
    </div>
  );
}
