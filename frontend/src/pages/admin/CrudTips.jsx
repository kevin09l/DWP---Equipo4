import "../../styles/styles.css";
import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Loader from "../../components/Loader";
import { tipsApi } from "../../services/api";

export default function CrudTips() {
  const [content, setContent] = useState("");
  const [tips, setTips] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadTips = async () => {
    try {
      setLoading(true);
      const res = await tipsApi.list();
      setTips(res.data || []);
    } catch (err) {
      setMessage(err.message || "No se pudieron cargar los consejos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTips();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await tipsApi.update(editingId, { content });
        setMessage("Consejo actualizado correctamente.");
      } else {
        await tipsApi.create({ content });
        setMessage("Consejo publicado correctamente.");
      }

      setContent("");
      setEditingId(null);
      await loadTips();
    } catch (err) {
      setMessage(err.message || "No se pudo guardar el consejo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await tipsApi.remove(id);
      setMessage("Consejo eliminado correctamente.");
      await loadTips();
    } catch (err) {
      setMessage(err.message || "No se pudo eliminar el consejo.");
    }
  };

  if (loading) {
    return <Loader message="Cargando consejos..." />;
  }

  return (
    <div className="admin-tips-page">
      <div className="admin-tips-card">
        <h2 className="admin-tips-title">Consejos de ahorro</h2>

        {message && <p role="alert">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Label htmlFor="tip-content">Contenido del consejo:</Label>
            <Input
              id="tip-content"
              value={content}
              type="text"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ej. Cierra la llave al cepillarte"
            />
          </div>

          <div className="admin-tips-actions">
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

            <button type="submit" className="btn-publish">
              {editingId ? "Actualizar" : "Publicar"}
            </button>
          </div>
        </form>

        <div style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
          {tips.map((tip) => (
            <div key={tip.id} className="tip-item">
              <p>{tip.content}</p>
              <p>{new Date(tip.created_at).toLocaleString()}</p>
              <div className="admin-tips-actions">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setEditingId(tip.id);
                    setContent(tip.content);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn-publish"
                  onClick={() => handleDelete(tip.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {!tips.length && <p>No hay consejos registrados.</p>}
        </div>
      </div>
    </div>
  );
}
