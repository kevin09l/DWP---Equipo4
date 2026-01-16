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


export default function CrudTips() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={5} />


<h1>Consejos para cuidar el agua</h1>


<input placeholder="Nuevo consejo" />
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