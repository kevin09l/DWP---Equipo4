import { useNavigate } from "react-router-dom";
import KeyboardNav from "../../components/KeyboardNav";


const routes = [
"/admin",
"/admin/dashboard",
"/admin/schedules",
"/admin/announcements",
"/admin/reports",
"/admin/tips",
];


export default function ManageReports() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={4} />


<h1>Gestión de Reportes</h1>


<p>Reporte Zona Norte - Pendiente</p>
<p>Reporte Centro - Resuelto</p>


<button>Marcar Resuelto</button>
<button>Eliminar</button>


<br />
<button onClick={() => navigate("/admin/dashboard")}>
Volver
</button>
</div>
);
}