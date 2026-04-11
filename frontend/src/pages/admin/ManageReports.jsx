import "../../styles/styles.css";
import { useEffect, useState } from "react";
import { admin } from "../../services/api";
import RoleGuard from "../../components/RoleGuard";

export default function ManageReports() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await admin.getReports();
    setReportes(res.data || []);
  };

  const aprobar = async (id) => {
    await admin.approveReport(id);
    cargar();
  };

  return (
    <div className="admin-reports-page">
      <h2 className="admin-reports-title">Reportes</h2>

      <div className="admin-reports-wrapper">
        
        <div className="admin-report-card">

          <table>
            <thead>
              <tr>
                <th>Urgencia</th>
                <th>Dirección</th>
                <th>Descripción</th>
              </tr>
            </thead>

            <tbody>
              {reportes.map((r) => (
                <tr key={r.id}>
                  <td>{r.priority}</td>
                  <td>{r.address}</td>
                  <td>{r.description}</td>

                  <td>
                    <RoleGuard allowRoles={["admin"]}>
                  <button className="btn-review">En revisión</button>
                  <button className="btn-accept" onClick={() => aprobar(r.id)}>Aceptado</button>
                  </RoleGuard>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
      </div>
    </div>
  );
}
