import "../../styles/styles.css";

export default function CrudAnnouncements() {
  return (
    <div className="admin-announcements-page">
      <div className="admin-announcements-card">
        <h2 className="admin-announcements-title">
          Crear Aviso <br /> Comunitario
        </h2>

        <div className="form-group">
          <label>Título del mensaje:</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Mensaje:</label>
          <textarea rows="5"></textarea>
        </div>

        <div className="admin-announcements-actions">
          <button className="btn-cancel">Cancelar</button>
          <button className="btn-publish">Publicar</button>
        </div>
      </div>
    </div>
  );
}
