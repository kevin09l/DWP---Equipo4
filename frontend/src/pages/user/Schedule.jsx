import { useRef, useEffect, useState } from "react";
import "../../styles/styles.css";
import Loader from "../../components/Loader";
import { schedulesApi } from "../../services/api";

export default function Schedule() {
  const headingRef = useRef(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        const res = await schedulesApi.list();
        setSchedules(res.data || []);
      } catch (err) {
        setError(err.message || "No se pudieron cargar los horarios.");
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  if (loading) {
    return <Loader message="Cargando horarios..." />;
  }

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h2 ref={headingRef} tabIndex="-1">Horarios</h2>
      </div>

      {error && <p role="alert">{error}</p>}

      <div style={{ display: "grid", gap: "12px" }}>
        {schedules.map((schedule) => (
          <div key={schedule.id} className="admin-report-card">
            <p>{schedule.content}</p>
            <p>{new Date(schedule.created_at).toLocaleString()}</p>
          </div>
        ))}
        {!schedules.length && <p>No hay horarios publicados.</p>}
      </div>
    </div>
  );
}
