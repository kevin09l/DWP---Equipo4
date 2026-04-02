import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "../components/ui/Alert";
import MenuAdmin from "../components/MenuAdmin";
import AdminNavbar from "../components/AdminNavbar";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AdminLayout() {
  const location = useLocation();

  const [sessionMessage, setSessionMessage] = useState("");

  const hideBreadcrumbsRoutes = [
    "/admin/dashboard",
    "/admin/tips",
    "/admin/reports",
    "/admin/announcements",
    "/admin/schedules"
  ];

  const hideBreadcrumbs = hideBreadcrumbsRoutes.includes(location.pathname);

  useEffect(() => {
    const expired = localStorage.getItem("sessionExpired");
    const logout = localStorage.getItem("logoutMessage");

    if (expired) {
      setSessionMessage("Tu sesión expiró. Inicia sesión nuevamente.");
      localStorage.removeItem("sessionExpired");
    }

    if (logout) {
      setSessionMessage(logout);
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  return (
    <div>
      {sessionMessage && (
        <div style={{ padding: "10px" }}>
          <Alert message={sessionMessage} type="error" />
        </div>
      )}
    
      <header
        className="header-admin"
      >
        <MenuAdmin />
        <AdminNavbar />
      </header>

      {/* CONTENIDO */}
      <main style={{ padding: "20px" }}>
      
        {!hideBreadcrumbs && <Breadcrumbs />}

        <Outlet />
      </main>
    </div>
  );
}
