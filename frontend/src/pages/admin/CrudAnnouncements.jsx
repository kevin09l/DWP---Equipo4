import "../../styles/styles.css";
import { useState } from "react";
import RoleGuard from "../../components/RoleGuard";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";

export default function CrudAnnouncements() {
  const [tittle, setTittle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="admin-announcements-page">
      <div className="admin-announcements-card">
        <h2 className="admin-announcements-title">
          Crear Aviso <br /> Comunitario
        </h2>

        <div className="form-group">
          <Label htmlFor="tittle">Título del mensaje:</Label>
          <Input
            id="tittle" 
            value={tittle}
            type="text"
            onChange={(e) => setTittle(e.target.value)} />
        </div>

        <div className="form-group">
          <Label>Mensaje:</Label>
          <textarea 
            id="message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="admin-announcements-actions">
          <button className="btn-cancel">Cancelar</button>
          <RoleGuard allowRoles={["admin"]}>
            <button className="btn-publish">Publicar</button>
          </RoleGuard>
        </div>
      </div>
    </div>
  );
}
