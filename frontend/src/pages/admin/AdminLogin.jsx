import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/styles.css";
import Loader from "../../components/Loader";
import { auth } from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const userRef = useRef(null);
  const passwordRef = useRef(null);

  const headingRef = useRef(null);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [esExito, setEsExito] = useState(false); 


  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const validar = () => {
    const nuevosErrores = {};
    if (!user.trim()) nuevosErrores.user = "El usuario es obligatorio";
    if (!password.trim()) nuevosErrores.password = "La contraseña es obligatoria";
    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacion = validar();

    if (Object.keys(validacion).length > 0) {
      setErrors(validacion);
      setEsExito(false);
      setMensaje("Revisa los campos obligatorios.");
      

      if (validacion.user) userRef.current?.focus();
      else if (validacion.password) passwordRef.current?.focus();
      return;
    }

    setErrors({});
    setMensaje("");
    setLoading(true);

    try {
      const data = await auth.login({ email: user, password });
      

      setEsExito(true);
      setMensaje("¡Acceso concedido! Entrando al panel...");
      
      localStorage.setItem("admin", "true");


      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (err) {
      console.error(err);
      setEsExito(false);
      
      if (!window.navigator.onLine) {
        setMensaje("Sin conexión a internet.");
      } else if (err.message.includes("Network Error") || err.message.includes("fetch")) {
        setMensaje("Error de red: No se pudo conectar con el servidor.");
      } else {
        setMensaje(err.message || "Credenciales de administrador incorrectas.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card" aria-busy={loading}>
        <div className="admin-login-header">

          <h2 ref={headingRef} tabIndex="-1" style={{ outline: 'none' }}>
            Inicio de sesión administrador
          </h2>
        </div>


        {mensaje && (
          <div 
            className={esExito ? "success-message-container" : "form-alert"} 
            role="alert" 
            aria-live="assertive"
          >
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="admin-user">Usuario</label>
            <input
              ref={userRef}
              id="admin-user"
              type="text"
              placeholder="admin@ejemplo.com"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                if (errors.user) setErrors({ ...errors, user: undefined });
              }}
              aria-invalid={!!errors.user}
              className={errors.user ? "input-error" : ""}
            />
            {errors.user && <p className="error-message">{errors.user}</p>}
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
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              aria-invalid={!!errors.password}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn-admin-login"
            disabled={loading}
          >
            {loading ? (
              <span aria-live="polite">
                <Loader message="Autenticando..." />
              </span>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}