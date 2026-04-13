import { useEffect, useState } from "react";
import { adminUsersApi, announcementsApi, reportsApi } from "../../services/api";
import Loader from "../../components/Loader";
import "../../styles/styles.css";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersRes, reportsRes, announcementsRes] = await Promise.all([
        adminUsersApi.list(),
        reportsApi.adminList(),
        announcementsApi.list()
      ]);

      setUsers(usersRes.data || []);
      setReports(reportsRes.data || []);
      setAnnouncements(announcementsRes.data || []);
    } catch (err) {
      setError(err.message || "No se pudo cargar el panel.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleUserStatus = async (userId, status) => {
    try {
      await adminUsersApi.updateStatus(userId, status);
      await loadDashboard();
    } catch (err) {
      setError(err.message || "No se pudo actualizar el usuario.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await adminUsersApi.remove(userId);
      await loadDashboard();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el usuario.");
    }
  };

  if (loading) {
    return <Loader message="Cargando panel de control..." />;
  }

  return (
    <div className="admin-dashboard-page">
      <h1 className="admin-dashboard-title">Panel de Control</h1>

      {error && <p role="alert">{error}</p>}

      <div className="admin-dashboard-cards">
        <div className="admin-card">
          <div className="report-circle">
            <span>{reports.length}</span>
          </div>
          <p className="card-text">Total de reportes registrados</p>
        </div>

        <div className="admin-card">
          <div className="report-circle">
            <span>{users.length}</span>
          </div>
          <p className="card-text">Usuarios activos en la plataforma</p>
        </div>
      </div>

      <section style={{ marginTop: "24px" }}>
        <h2>Usuarios</h2>
        {!users.length ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {users.map((user) => (
              <div key={user.id} className="admin-report-card">
                <p><strong>{user.name}</strong> ({user.email})</p>
                <p>Rol: {user.role}</p>
                <p>Estado: {user.status}</p>
                <div className="admin-report-actions">
                  <button
                    className="btn-review"
                    onClick={() =>
                      handleUserStatus(user.id, user.status === "banned" ? "active" : "banned")
                    }
                  >
                    {user.status === "banned" ? "Reactivar" : "Banear"}
                  </button>
                  <button
                    className="btn-accept"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: "24px" }}>
        <h2>Ultimos avisos</h2>
        {!announcements.length ? (
          <p>No hay avisos publicados.</p>
        ) : (
          <ul className="alerts-list">
            {announcements.slice(0, 5).map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> - {item.description}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
