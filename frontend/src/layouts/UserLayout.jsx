import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "../components/ui/Alert";
import UserNavbar from "../components/UserNavbar";
import Breadcrumbs from "../components/Breadcrumbs";
export default function UserLayout() {

  const [sessionMessage, setSessionMessage] = useState("");

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
        className="header-user"
      >
        <UserNavbar />
      </header>

      <main style={{ padding: "20px" }}>
        <Breadcrumbs/>

        <Outlet />
      </main>
    </div>
  );
}
