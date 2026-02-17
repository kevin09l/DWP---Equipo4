import "../../styles/styles.css";

export default function Dashboard() {
  return (
    <div className="admin-dashboard-page">
     
      <h1 className="admin-dashboard-title">Panel de Control</h1>

      
      <div className="admin-dashboard-cards">
      
        <div className="admin-card">
          <div className="report-circle">
            <span>70</span>
          </div>
          <p className="card-text">Total de reportes activos</p>
        </div>

   
        <div className="admin-card">
          <h3 className="card-title">Últimos avisos publicados</h3>
          <ul className="alerts-list">
            <li>
              <strong>Lomas de la Soledad</strong> – Fuga no atendida
            </li>
            <li>
              <strong>Sedrán</strong> – Reportes de fugas en red
            </li>
            <li>
              <strong>Santiago Tula</strong> – Escasez y problemas de
              suministro
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
