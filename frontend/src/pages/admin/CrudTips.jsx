import "../../styles/styles.css";
import { useState } from "react";
import RoleGuard from "../../components/RoleGuard";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";

export default function CrudTips() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="admin-tips-page">
      <div className="admin-tips-card">
        <h2 className="admin-tips-title">Consejos de ahorro</h2>

        <div className="form-group">
          <Label htmlFor="tittle">Título del Consejo:</Label>
          <Input 
            id="title"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Ej. Cierra la llave al cepillarte" />
        </div>

        <div className="form-group">
          <Label htmlFor="description">Descripción:</Label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el consejo de ahorro de agua"
          ></textarea>
        </div>

        <div className="admin-tips-actions">
          <button className="btn-cancel">Cancelar</button>

          <RoleGuard allowRoles={["admin"]}>
            <button className="btn-publish">Publicar</button>
          </RoleGuard>
        </div>
      </div>
    </div>
  );
}
