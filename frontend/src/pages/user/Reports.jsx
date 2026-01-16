import { useNavigate } from "react-router-dom";
import KeyboardNav from "../../components/KeyboardNav";


const routes = [
"/",
"/register",
"/home",
"/reports",
"/status",
"/notifications",
"/schedule",
"/tips",
];


export default function Reports() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={3} />

<h1>Reportar Escasez de Agua</h1>


<input placeholder="Colonia / Zona" />
<br />
<textarea placeholder="Descripción del problema" />
<br />


<button onClick={() => navigate("/home")}>Volver</button>
<button>Enviar Reporte</button>
</div>
);
}