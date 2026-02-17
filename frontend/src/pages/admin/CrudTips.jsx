import "../../styles/styles.css";

export default function CrudTips() {
  return (
    <div className="admin-tips-page">
      <div className="admin-tips-card">
        <h2 className="admin-tips-title">Consejos de ahorro</h2>

        <div className="form-group">
          <label>Título del Consejo:</label>
          <input type="text" placeholder="Ej. Cierra la llave al cepillarte" />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            rows="4"
            placeholder="Describe el consejo de ahorro de agua"
          ></textarea>
        </div>

        <div className="admin-tips-actions">
          <button className="btn-cancel">Cancelar</button>
          <button className="btn-publish">Publicar</button>
        </div>
      </div>
    </div>
  );
}
