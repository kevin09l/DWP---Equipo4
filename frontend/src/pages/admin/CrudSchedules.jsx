import "../../styles/styles.css";
import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Loader from "../../components/Loader";
import { schedulesApi } from "../../services/api";

export default function CrudSchedules() {
  const [content, setContent] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const res = await schedulesApi.list();
      setSchedules(res.data || []);
    } catch (err) {
      setMessage(err.message || "No se pudieron cargar los horarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await schedulesApi.update(editingId, { content });
        setMessage("Horario actualizado correctamente.");
      } else {
        await schedulesApi.create({ content });
        setMessage("Horario creado correctamente.");
      }

      setContent("");
      setEditingId(null);
      await loadSchedules();
    } catch (err) {
      setMessage(err.message || "No se pudo guardar el horario.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await schedulesApi.remove(id);
      setMessage("Horario eliminado correctamente.");
      await loadSchedules();
    } catch (err) {
      setMessage(err.message || "No se pudo eliminar el horario.");
    }
  };

  if (loading) {
    return <Loader message="Cargando horarios..." />;
  }

  return (
    <div className="admin-schedule-page">
      <div className="admin-schedule-card">
        <h2 className="admin-schedule-title">
          Gestion de horarios
        </h2>

        {message && <p role="alert">{message}</p>}

        <form className="admin-schedule-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <Label htmlFor="schedule-content">Contenido:</Label>
            <Input
              id="schedule-content"
              value={content}
              type="text"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ej. Zona Norte - Lunes y Miercoles de 7:00 a 11:00"
            />
          </div>

          <div className="admin-schedule-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setContent("");
                setEditingId(null);
              }}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-save">
              {editingId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>

        <div style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
          {schedules.map((schedule) => (
            <div key={schedule.id} className="admin-report-card">
              <p>{schedule.content}</p>
              <p>{new Date(schedule.created_at).toLocaleString()}</p>
              <div className="admin-schedule-actions">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setEditingId(schedule.id);
                    setContent(schedule.content);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(schedule.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {!schedules.length && <p>No hay horarios registrados.</p>}
        </div>
      </div>
    </div>
  );
}
