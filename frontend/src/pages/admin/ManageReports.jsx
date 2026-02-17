import "../../styles/styles.css";

export default function ManageReports() {
  return (
    <div className="admin-reports-page">
      <h2 className="admin-reports-title">Reportes</h2>

      <div className="admin-reports-wrapper">
      
        <button className="arrow-btn left">‹</button>

      
        <div className="admin-report-card">
          <p><strong>Urgencia:</strong></p>
          <p><strong>Dirección:</strong></p>
          <p><strong>Descripción:</strong></p>

          <div className="admin-report-actions">
            <button className="btn-review">En revisión</button>
            <button className="btn-accept">Aceptado</button>
          </div>
        </div>

     
        <div className="admin-report-card">
          <p><strong>Urgencia:</strong></p>
          <p><strong>Dirección:</strong></p>
          <p><strong>Descripción:</strong></p>

          <div className="admin-report-actions">
            <button className="btn-review">En revisión</button>
            <button className="btn-accept">Aceptado</button>
          </div>
        </div>

     
        <div className="admin-report-card">
          <p><strong>Urgencia:</strong></p>
          <p><strong>Dirección:</strong></p>
          <p><strong>Descripción:</strong></p>

          <div className="admin-report-actions">
            <button className="btn-review">En revisión</button>
            <button className="btn-accept">Aceptado</button>
          </div>
        </div>

        
        <button className="arrow-btn right">›</button>
      </div>
    </div>
  );
}
