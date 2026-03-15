import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "../../styles/styles.css";

import Loader from "../../components/Loader";
import { auth } from "../../services/api";

import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

export default function Login() {

  const navigate = useNavigate();

  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const alertRef = useRef(null);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const [errorUsuario, setErrorUsuario] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [esExito, setEsExito] = useState(false);

 const manejarLogin = async () => {
    let hayError = false;

    // Validaciones iniciales
    if (!usuario.trim()) {
      setErrorUsuario(true);
      userRef.current?.focus();
      hayError = true;
    } else {
      setErrorUsuario(false);
    }

    if (!password.trim()) {
      setErrorPassword(true);
      if (!hayError) passwordRef.current?.focus();
      hayError = true;
    } else {
      setErrorPassword(false);
    }

    if (hayError) {
      setMensajeError("Todos los campos son obligatorios.");
      alertRef.current?.focus();
      return;
    }

    setMensajeError("");
    setLoading(true);

    try {
      const data = await auth.login({
        email: usuario.trim(), // Limpiamos espacios para evitar errores de validación
        password,
      });

      // Extraemos la información del Backend
      const role = data.user?.role; // Asegúrate que tu back mande 'role'
      const token = data.token;

      setEsExito(true);
      setMensajeError("¡Bienvenido! Iniciando sesión...");

      // --- PERSISTENCIA DE DATOS (CORREGIDA) ---
      localStorage.setItem("token", token);
      
      // Guardamos como objeto JSON para que AppRoutes no explote
      localStorage.setItem("user", JSON.stringify({
        name: data.user?.name || usuario,
        rol: role
      }));
      
      localStorage.setItem("role", role); // Lo dejamos también individual por si lo usas en otro lado

      // Redirección con retraso para mostrar el mensaje de éxito (Tarea 4: Performance)
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "user") {
          navigate("/user/home");
        } else {
          navigate("/");
        }
      }, 1200);

    } catch (err) {
      console.error("Error en login:", err);
      setEsExito(false);

      if (!window.navigator.onLine) {
        setMensajeError("Sin conexión a internet. Verifique su red.");
      } else if (
        err.message?.includes("Network Error") ||
        err.message?.includes("fetch")
      ) {
        setMensajeError("Error de red: No se pudo conectar con el servidor.");
      } else {
        // Tarea 3: Mensajería de error clara pero segura
        setMensajeError(err.message || "Credenciales incorrectas. Intente de nuevo.");
      }

      alertRef.current?.focus();

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
       <button
        type="button"
        className="btn-inicio"
        onClick={() => navigate("/user/home")}
      >
        Inicio
      </button>
      <div className="login-card">
        <div className="login-header">
          <h2 tabIndex="0">Inicio de sesión</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejarLogin();
          }}
          noValidate
        >

          {mensajeError && (
            <div ref={alertRef} tabIndex="-1">
              <Alert
                message={mensajeError}
                type={esExito ? "success" : "error"}
              />
            </div>
          )}

          <div className="form-group">
            <Label htmlFor="usuario">
              Usuario:
            </Label>
            <Input
              ref={userRef}
              id="usuario"
              tabIndex="0"
              value={usuario}
              aria-describedby="usuario-error"
              onChange={(e) => {
                setUsuario(e.target.value);

                if (e.target.value.trim() !== "") {
                  setErrorUsuario(false);
                  setMensajeError("");
                }
              }}
              error={errorUsuario}
            />

            {errorUsuario && (
              <p
                id="usuario-error"
                className="error-message"
                role="alert"
              >
                El usuario es obligatorio
              </p>
            )}

          </div>

          <div className="form-group">
            <Label htmlFor="password">
              Contraseña:
            </Label>
            <Input
              ref={passwordRef}
              id="password"
              type="password"
              tabIndex="0"
              value={password}
              aria-describedby="password-error"
              onChange={(e) => {
                setPassword(e.target.value);

                if (e.target.value.trim() !== "") {
                  setErrorPassword(false);
                  setMensajeError("");
                }
              }}
              error={errorPassword}
            />
            {errorPassword && (
              <p
                id="password-error"
                className="error-message"
                role="alert"
              >
                La contraseña es obligatoria
              </p>
            )}
          </div>
          <div
            className="login-actions"
            aria-busy={loading ? "true" : "false"}
          >
            <Button
              className="btn-secondary"
              tabIndex="0"
              onClick={() => navigate("/register")}
              disabled={loading}
            >
              Registrarse
            </Button>
            <Button
              type="submit"
              className="btn-primary"
              tabIndex="0"
              disabled={loading}
            >
              {loading ? (
                <span aria-live="polite">
                  <Loader message="Iniciando sesión..." />
                </span>

              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}