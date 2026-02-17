import "../../styles/styles.css";

export default function CrudSchedules() {
  return (
    <div className="admin-schedule-page">
      <div className="admin-schedule-card">
        <h2 className="admin-schedule-title">
          Crear Horario de Abastecimiento
        </h2>

        <div className="admin-schedule-form">
          <div className="form-group">
            <label>Zona:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Día:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Hora Inicio:</label>
            <input type="time" />
          </div>

          <div className="form-group">
            <label>Hora Fin:</label>
            <input type="time" />
          </div>

          <div className="admin-schedule-actions">
            <button className="btn-delete">Eliminar</button>
            <button className="btn-cancel">Cancelar</button>
            <button className="btn-save">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
