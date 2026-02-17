import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/styles.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const userRef = useRef(null);
  const passwordRef = useRef(null);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const validar = () => {
    const nuevosErrores = {};

    if (!user.trim()) {
      nuevosErrores.user = "El usuario es obligatorio";
    }

    if (!password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validacion = validar();

    if (Object.keys(validacion).length > 0) {
      setErrors(validacion);
      setMensajeError("Todos los campos son obligatorios.");

      if (validacion.user) {
        userRef.current?.focus();
      } else if (validacion.password) {
        passwordRef.current?.focus();
      }

      return;
    }

    setErrors({});
    setMensajeError("");
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("admin", "true");
      setLoading(false);
      navigate("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="admin-login-page">
      <div
        className="admin-login-card"
        aria-busy={loading}
      >
        <div className="admin-login-header">
          <h2>Inicio de sesión administrador</h2>
        </div>

        {mensajeError && (
          <div role="alert" aria-live="assertive" className="error-message">
            {mensajeError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="admin-user">Usuario</label>
            <input
              ref={userRef}
              id="admin-user"
              type="text"
              placeholder="admin"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                if (errors.user) {
                  setErrors({ ...errors, user: undefined });
                }
              }}
              aria-invalid={!!errors.user}
              aria-describedby={errors.user ? "admin-user-error" : undefined}
              className={errors.user ? "input-error" : ""}
            />

            {errors.user && (
              <p id="admin-user-error" className="error-message">
                {errors.user}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Contraseña</label>
            <input
              ref={passwordRef}
              id="admin-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: undefined });
                }
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "admin-password-error" : undefined}
              className={errors.password ? "input-error" : ""}
            />

            {errors.password && (
              <p id="admin-password-error" className="error-message">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-admin-login"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>

        </form>
      </div>
    </div>
  );
}
