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


export default function CrudAnnouncements() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={3} />


<h1>Anuncios</h1>


<input placeholder="Nuevo anuncio" />
<br />


<button>Publicar</button>
<button>Editar</button>
<button>Eliminar</button>

<br />
<button onClick={() => navigate("/admin/dashboard")}>
Volver
</button>
</div>
);
}