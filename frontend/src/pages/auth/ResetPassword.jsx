import { useState } from "react";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Alert from "../../components/ui/Alert";
import { useSearchParams,useNavigate } from "react-router-dom";
import { auth } from "../../services/api";


export default function ResetPassword() {
  const [params] = useSearchParams(); 
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  

  const validatePassword = (value) => {
    const minLength = value.length >= 8;
    const hasNumber = /\d/.test(value);

    return minLength && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "La contraseña debe tener mínimo 8 caracteres y al menos un número"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

   try {
        // Enviamos el token que capturamos de la URL y la nueva clave
        await auth.resetPassword(token, password); 

        setMessage("Tu contraseña ha sido actualizada correctamente");
        
        // Redirigir al login tras 2 segundos de éxito
        setTimeout(() => navigate("/"), 2000);

    } catch(err) {
        setError(err.response?.data?.message || "Token inválido o expirado");
    }

  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 tabIndex="0">Nueva contraseña</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <Label htmlFor="password">Nueva contraseña:</Label>

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="password-error"
              aria-invalid={!!error}
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="confirmPassword">Confirmar contraseña:</Label>

            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-describedby="password-error"
              aria-invalid={!!error}
              required
            />
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginBottom: "10px" }}
          >
            {showPassword ? "Ocultar contraseña" : "Ver contraseña"}
          </button>

          {error && <Alert message={error} type="error" />}
          {message && <Alert message={message} type="success" />}

          <button type="submit" className="btn btn-primary">Guardar nueva contraseña</button>
        </form>
      </div>
    </div>
  );
}