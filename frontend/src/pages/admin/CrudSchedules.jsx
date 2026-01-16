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


export default function CrudSchedules() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={2} />


<h1>Horarios de corte de agua</h1>


<input placeholder="Nuevo horario" />
<br />


<button>Crear</button>
<button>Editar</button>
<button>Eliminar</button>

<br />
<button onClick={() => navigate("/admin/dashboard")}>
Volver
</button>
</div>
);
}