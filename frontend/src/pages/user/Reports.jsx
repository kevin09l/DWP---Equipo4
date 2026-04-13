import { useEffect, useRef, useState } from "react";
import { reportsApi } from "../../services/api";
import Loader from "../../components/Loader";

export default function Reports() {
  const headingRef = useRef(null);
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      const res = await reportsApi.mine();
      setReports(res.data || []);
    } catch (err) {
      setMessage(err.message || "No se pudieron cargar tus reportes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    headingRef.current?.focus();
    loadReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      await reportsApi.create({ description });
      setDescription("");
      setMessage("Reporte enviado correctamente.");
      await loadReports();
    } catch (err) {
      setMessage(err.message || "No se pudo enviar el reporte.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader message="Cargando reportes..." />;
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2 ref={headingRef} tabIndex="-1">Reportes de Agua</h2>
      </div>

      <p className="reports-description">
        Describe el problema relacionado con el servicio de agua. Tu reporte quedara asociado
        a tu cuenta y podras seguir su estado desde esta misma vista.
      </p>

      {message && <p role="alert">{message}</p>}

      <form className="reports-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Descripcion del reporte:</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="reports-actions">
          <button className="btn-report" type="submit" disabled={saving}>
            {saving ? "Enviando..." : "Realizar Reporte"}
          </button>
        </div>
      </form>

      <div style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
        {reports.map((report) => (
          <div key={report.id} className="admin-report-card">
            <p><strong>Descripcion:</strong> {report.description}</p>
            <p><strong>Estado:</strong> {report.status}</p>
            <p><strong>Fecha:</strong> {new Date(report.created_at).toLocaleString()}</p>
          </div>
        ))}
        {!reports.length && <p>No has enviado reportes aun.</p>}
      </div>
    </div>
  );
}
