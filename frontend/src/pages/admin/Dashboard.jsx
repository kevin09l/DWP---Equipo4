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


export default function Dashboard() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={1} />


<h1>panel de Administrador</h1>


<button onClick={() => navigate("/admin/schedules")}>
Horarios de corte de agua
</button>
<button onClick={() => navigate("/admin/reports")}>
Gestión Reportes
</button>
</div>
);
}