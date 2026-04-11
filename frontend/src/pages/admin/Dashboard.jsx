import "../../styles/styles.css";
import { useEffect, useEffectEvent, useState } from "react";
import { admin } from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [reports, setReports] = useState([]); 

  useEffect(() => {
    cargar();
  }, []); 

  const cargar = async () => {
    const res = await admin.getReports(); 
    setReports(res.data || []); 
  }; 

  const dataGrafica = [
    { name: "Reportes", total: reportes.length },
  ];
  return (
    <div className="admin-dashboard-page">
     
      <h1 className="admin-dashboard-title">Panel de Control</h1>

      <div className="admin-dashboard-cards">
      
        <div className="admin-card">

          <h3>Total Reportes</h3>
          <h2>{reports.length}</h2>
          <div style={{ height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={dataGrafica}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
