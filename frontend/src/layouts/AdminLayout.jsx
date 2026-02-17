import { Outlet, useLocation } from "react-router-dom";
import MenuAdmin from "../components/MenuAdmin";
import AdminNavbar from "../components/AdminNavbar";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AdminLayout() {
  const location = useLocation();

  const hideBreadcrumbsRoutes = [
    "/admin/dashboard",
    "/admin/tips",
    "/admin/reports",
    "/admin/announcements",
    "/admin/schedules"
  ];

  const hideBreadcrumbs = hideBreadcrumbsRoutes.includes(location.pathname);

  return (
    <div>
    
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
        }}
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
