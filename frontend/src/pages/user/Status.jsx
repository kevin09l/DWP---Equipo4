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


export default function Status() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={4} />


<h1>Status de Reportes</h1>


<p>Reporte #1 - En revisión</p>
<p>Reporte #2 - Resuelto</p>


<button onClick={() => navigate("/home")}>Volver</button>
</div>
);
}