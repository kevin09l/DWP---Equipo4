import { NavLink } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuthChannel, sendLogout } from "../hooks/useAuthChannel";
import {auth} from '../services/api'
import "../styles/styles.css";

export default function UserNavbar() {

  const navRef = useRef(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useAuthChannel(); 
  
    useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel("auth");

    channel.onmessage = (event) => {
      if (event.data.type === "logout") {
        setIsAuthenticated(false);
      }

      if (event.data.type === "login") {
        setIsAuthenticated(true);
      }
    };

    return () => channel.close();
  }, []);

  const handleLogout = async() => {
    await auth.logout(); 
    
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    localStorage.removeItem("role");
          
    setIsAuthenticated(false);

    sendLogout();
    window.location.replace("/")
  }

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
           {!isAuthenticated ? (
          <NavLink to="/login" className="login-pill">
            Iniciar sesión
          </NavLink>
        ) : (
          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
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
