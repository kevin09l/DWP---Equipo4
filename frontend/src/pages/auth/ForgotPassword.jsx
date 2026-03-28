import { useState } from "react";
import  Label  from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Alert from "../../components/ui/Alert";
import { auth } from "../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = async (e) => {
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
    
    try {
        await auth.forgotPassword(email); 

        setMessage("Si el correo está registrado, recibirás las instrucciones en breve.");
    
    } catch (err){
    
        setError(err.response?.message || "Error del servidor");    }
  
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

          {error && <Alert message={error} type="error" />}
          {message && <Alert message={message} type="success" />}

          <button type="submit" className="btn btn-primary">Enviar instrucciones</button>
        </form>
        
      </div>
      
    </div>
  );
}