import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader";
import { reportsApi } from "../../services/api";

export default function Status() {
  const headingRef = useRef(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const res = await reportsApi.mine();
        setReports(res.data || []);
      } catch (err) {
        setError(err.message || "No se pudo cargar el estado de tus reportes.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) {
    return <Loader message="Cargando estado de reportes..." />;
  }

  return (
    <div>
      <h1 ref={headingRef} tabIndex="-1">Estado de Reportes</h1>
      {error && <p role="alert">{error}</p>}

      {reports.length ? (
        reports.map((report) => (
          <p key={report.id}>
            Reporte #{report.id} - {report.status}
          </p>
        ))
      ) : (
        <p>No hay reportes para mostrar.</p>
      )}
    </div>
  );
}
