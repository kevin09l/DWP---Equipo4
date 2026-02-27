import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/styles.css";
import Loader from "../../components/Loader";
import { auth } from "../../services/api";

export default function Register() {
  const navigate = useNavigate();
  const headingRef = useRef(null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
    medidor: "",
    password: "",
    confirm: ""
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [esExito, setEsExito] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "Nombre obligatorio";
    }

    if (!form.email.includes("@")) {
      nuevosErrores.email = "Correo inválido";
    }

    if (!form.direccion.trim()) {
      nuevosErrores.direccion = "Dirección obligatoria";
    }

    if (!form.medidor.trim()) {
      nuevosErrores.medidor = "Número de medidor obligatorio";
    }

    if (form.password.length < 6) {
      nuevosErrores.password = "Mínimo 6 caracteres";
    }

    if (form.password !== form.confirm) {
      nuevosErrores.confirm = "Las contraseñas no coinciden";
    }

    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validacion = validar();

    if (Object.keys(validacion).length > 0) {
      setErrors(validacion);
      setEsExito(false);
      setMensaje("Revisa los errores del formulario.");
      return;
    }

    setErrors({});
    setMensaje("");
    setLoading(true);

    try {
      const data = await auth.register(form);
      setEsExito(true);
      setMensaje("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => {
      localStorage.setItem("user", form.nombre);
      navigate("/home");
    }, 1500);
    } catch (err) {
      console.error(err);
    if (!window.navigator.onLine) {
        setMensaje("Sin conexión a internet. Verifica tu red.");
      } else if (err.message.includes("Network Error") || err.message.includes("fetch")) {
        setMensaje("Error de red: No se pudo conectar con el servidor.");
      } else {
        setMensaje(err.message || "Error al registrar la cuenta.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <button
        type="button"
        className="btn-inicio"
        onClick={() => navigate("/")}
      >
        Inicio
      </button>

      <div className="register-card">

        <div className="register-header">
          <h2 ref={headingRef} tabIndex="-1">
            Registro
          </h2>
        </div>

        {mensaje && (
          <div role="alert" aria-live="assertive" className={esExito ? "success-message-container" : "form-alert"}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              type="text"
              value={form.nombre}
              onChange={(e) =>
                setForm({ ...form, nombre: e.target.value })
              }
              className={errors.email ? "input-error" : ""}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
            {errors.nombre && <p className="error-message" id="nombre-error">{errors.nombre}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className={errors.email ? "input-error" : ""}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p className="error-message" id="email-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              id="direccion"
              type="text"
              value={form.direccion}
              onChange={(e) =>
                setForm({ ...form, direccion: e.target.value })
              }
              className={errors.email ? "input-error" : ""}
              aria-invalid={!!errors.direccion}
              aria-describedby={errors.direccion ? "direccion-error" : undefined}
            />
            {errors.direccion && <p className="error-message">{errors.direccion}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="medidor">Medidor:</label>
            <input
              id="medidor"
              type="text"
              value={form.medidor}
              onChange={(e) =>
                setForm({ ...form, medidor: e.target.value })
              }
              className={errors.email ? "input-error" : ""}
              aria-invalid={!!errors.medidor}
              aria-describedby={errors.medidor ? "medidor-error" : undefined}
            />
            {errors.medidor && <p className="error-message">{errors.medidor}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className={errors.email ? "input-error" : ""}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirmar Contraseña:</label>
              <input
                id="confirm"
                type="password"
                value={form.confirm}
                onChange={(e) =>
                  setForm({ ...form, confirm: e.target.value })
                }
                className={errors.email ? "input-error" : ""}
                aria-invalid={!!errors.confirm}
                aria-describedby={errors.confirm ? "confirm-error" : undefined}
              />
              {errors.confirm && <p className="error-message">{errors.confirm}</p>}
            </div>
          </div>

          <div className="register-footer" aria-busy={loading ? "true" : "false"}>
            <span className="login-link">
              ¿Ya tienes una cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                  font: "inherit",
                }}
              >
                Inicia sesión
              </button>
            </span>
            <button
              type="submit"
              className="btn-register"
              disabled={loading}
            >
              {loading ? <span aria-live="polite">
                  <Loader message="Registrando..." />
                </span> : "Registrarse"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
