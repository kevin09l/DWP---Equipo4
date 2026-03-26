import { useState } from "react";
import  Label  from "../../components/ui/Label";
import Input from "../../components/ui/Input";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("El correo electrónico es obligatorio");
      return;
    }

    if (!validateEmail(email)) {
      setError("Ingresa un correo electrónico válido");
      return;
    }

    setMessage(
      "Si el correo está registrado, recibirás las instrucciones en breve."
    );
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 tabIndex="0">Recupera tu contraseña</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <Label htmlFor="email">Correo electrónico:</Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-error"
              aria-invalid={!!error}
              required
            />
          </div>

          <div
            id="email-error"
            aria-live="assertive"
            style={{ color: "red", minHeight: "20px" }}
          >
            {error}
          </div>

          <div
            aria-live="polite"
            style={{ color: "green", minHeight: "20px" }}
          >
            {message}
          </div>

          <button type="submit" className="btn btn-primary">Enviar instrucciones</button>
        </form>
        
      </div>
      
    </div>
  );
}