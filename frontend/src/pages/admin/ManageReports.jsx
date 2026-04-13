import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { reportsApi } from "../../services/api";
import "../../styles/styles.css";

const STATUSES = ["Pendiente", "En Proceso", "Atendido"];

export default function ManageReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      const res = await reportsApi.adminList();
      setReports(res.data || []);
    } catch (err) {
      setMessage(err.message || "No se pudieron cargar los reportes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await reportsApi.adminUpdateStatus(id, status);
      setMessage("Estado actualizado correctamente.");
      await loadReports();
    } catch (err) {
      setMessage(err.message || "No se pudo actualizar el reporte.");
    }
  };

  const deleteReport = async (id) => {
    try {
      await reportsApi.adminRemove(id);
      setMessage("Reporte eliminado correctamente.");
      await loadReports();
    } catch (err) {
      setMessage(err.message || "No se pudo eliminar el reporte.");
    }
  };

  if (loading) {
    return <Loader message="Cargando reportes..." />;
  }

  return (
    <div className="admin-reports-page">
      <h2 className="admin-reports-title">Reportes</h2>
      {message && <p role="alert">{message}</p>}

      <div style={{ display: "grid", gap: "16px" }}>
        {reports.map((report) => (
          <div key={report.id} className="admin-report-card">
            <p><strong>Usuario:</strong> {report.user_name}</p>
            <p><strong>Correo:</strong> {report.user_email}</p>
            <p><strong>Direccion:</strong> {report.user_address}</p>
            <p><strong>Descripcion:</strong> {report.description}</p>
            <p><strong>Estado actual:</strong> {report.status}</p>

            <div className="admin-report-actions">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  className="btn-review"
                  onClick={() => updateStatus(report.id, status)}
                >
                  {status}
                </button>
              ))}
              <button
                className="btn-accept"
                onClick={() => deleteReport(report.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {!reports.length && <p>No hay reportes registrados.</p>}
      </div>
    </div>
  );
}
