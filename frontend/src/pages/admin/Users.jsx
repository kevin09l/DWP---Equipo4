import "../../styles/styles.css";
import { useEffect, useState } from "react";
import { admin } from "../../services/api";
import Modal from "../../components/ui/Modal";
import RoleGuard from "../../components/RoleGuard";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await admin.getUsers();
    setUsers(res.data || []);
  };

  return (
    <div className="admin-users-page">
      <h2 className="admin-users-title">Usuarios</h2>

      <button onClick={() => setShowModal(true)}>
        Nuevo Usuario
      </button>

      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td className="admin-users-actions">
                <RoleGuard>
                <button className="admin-btn-edit">
                  Editar
                </button>
                <button className="admin-btn-delete">
                  Eliminar
                </button>
                </RoleGuard>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal title="Crear Usuario" onClose={() => setShowModal(false)}>
          <input placeholder="Nombre" />
          <input placeholder="Email" />
          <button>Guardar</button>
        </Modal>
      )}
    </div>
  );
}