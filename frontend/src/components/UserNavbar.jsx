import { NavLink } from "react-router-dom";
import { useRef } from "react";
import "../styles/styles.css";

export default function UserNavbar() {

  const navRef = useRef(null); 

  const manejarTeclado = (e) => {
    const items = navRef.current?.querySelectorAll(".nav-pill");
    if (!items || items.length === 0) return;

    const currentIndex = Array.from(items).indexOf(document.activeElement);
    if (currentIndex === -1) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex =
        (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    }

  };

  return (
    <header className="home-navbar">
      
      <div className="home-navbar-left">
        <div className="user-avatar"></div>
        <NavLink to="/" className="login-pill">
          Iniciar sesión
        </NavLink>
      </div>
      
      <nav
        className="home-navbar-menu"
        aria-label="Menú de usuario"
        ref={navRef}              
        onKeyDown={manejarTeclado} 
      >

        <NavLink to="/home" className="nav-pill">
          Inicio
        </NavLink>

        <NavLink to="/reports" className="nav-pill">
          Reportes
        </NavLink>

        <NavLink to="/notifications" className="nav-pill">
          Avisos
        </NavLink>

        <NavLink to="/schedule" className="nav-pill">
          Horarios
        </NavLink>

        <NavLink to="/tips" className="nav-pill">
          Consejos
        </NavLink>
      </nav>
    </header>
  );
}
