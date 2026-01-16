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


export default function Home() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={2} />


<h1>Pantalla Inicio</h1>


<button onClick={() => navigate("/reports")}>Reportes</button>
<button onClick={() => navigate("/status")}>Status del Reporte</button>
</div>
);
}
