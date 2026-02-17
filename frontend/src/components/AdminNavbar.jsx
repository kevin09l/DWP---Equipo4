import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { navLinkStyle } from "../styles/navLinkStyle";

export default function AdminNavbar() {
  const location = useLocation();
  const navRef = useRef(null);

  const handleKeyboard = (e) => {
    const links = navRef.current?.querySelectorAll("a");
    if (!links || links.length === 0) return;

  const currentIndex = Array.from(links).indexOf(document.activeElement);
  if (currentIndex === -1) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % links.length;
      links[nextIndex].focus();
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex =
        (currentIndex - 1 + links.length) % links.length;
      links[prevIndex].focus();
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Navegación principal del administrador"
      onKeyDown={handleKeyboard}
      role="navigation"
      style={{ display: "flex", gap: "0px", marginLeft: "900px" }}
    >

      <NavLink
        to="/admin/dashboard"
        style={navLinkStyle}
        aria-current={
          location.pathname.startsWith("/admin/dashboard") ? "page" : undefined
        }
      >
        Panel
      </NavLink>

      <NavLink
        to="/admin/reports"
        style={navLinkStyle}
        aria-current={
          location.pathname.startsWith("/admin/reports") ? "page" : undefined
        }
      >
        Reportes
      </NavLink>

      <NavLink
        to="/admin/announcements"
        style={navLinkStyle}
        aria-current={
          location.pathname.startsWith("/admin/announcements")
            ? "page"
            : undefined
        }
      >
        Avisos
      </NavLink>

      <NavLink
        to="/admin/schedules"
        style={navLinkStyle}
        aria-current={
          location.pathname.startsWith("/admin/schedules")
            ? "page"
            : undefined
        }
      >
        Horarios
      </NavLink>

      <NavLink
        to="/admin/tips"
        style={navLinkStyle}
        aria-current={
          location.pathname.startsWith("/admin/tips") ? "page" : undefined
        }
      >
        Consejos
      </NavLink>
    </nav>
  );
}
