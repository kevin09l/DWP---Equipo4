import "../../styles/styles.css";
import { useState } from "react";
import RoleGuard from "../../components/RoleGuard";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label"

export default function CrudSchedules() {
  const [zona, setZona] = useState("");
  const [dia, setDia] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  return (
    <div className="admin-schedule-page">
      <div className="admin-schedule-card">
        <h2 className="admin-schedule-title">
          Crear Horario de Abastecimiento
        </h2>

        <div className="admin-schedule-form">
          <div className="form-group">
            <Label htmlFor="zona">Zona:</Label>
            <Input 
              id="zona" 
              value={zona} 
              type="text" 
              onChange={(e) => setZona(e.target.value)}/>
          </div>

          <div className="form-group">
            <Label htmlFor="dia">Día:</Label>
            <Input 
              id="dia" 
              value={dia} 
              type="text"
              onChange={(e) => setDia(e.target.value)} />
          </div>

          <div className="form-group">
            <Label htmlFor="inicio">Hora Inicio:</Label>
            <Input 
              id="inicio" 
              value={inicio}
              type="time"
              onChange={(e) => setInicio(e.target.value)}
             />
          </div>

          <div className="form-group">
            <Label htmlFor="fin">Hora Fin:</Label>
            <input 
              id="fin" 
              value={fin} 
              type="time"
              onChange={(e) => setFin(e.target.value)} />
          </div>

          <div className="admin-schedule-actions">
            <RoleGuard allowRoles={["admin"]}>
              <button className="btn-delete">Eliminar</button>
            </RoleGuard>
            
            <button className="btn-cancel">Cancelar</button>

            <RoleGuard allowRoles={["admin"]}>
              <button className="btn-save">Guardar</button>
            </RoleGuard>
            
          </div>
        </div>
      </div>
    </div>
  );
}
