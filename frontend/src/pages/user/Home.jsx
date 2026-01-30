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

<button onClick={() => navigate("/Login")}>iniciar sesion</button>
<button onClick={() => navigate("/home")}>inicio</button>
<button onClick={() => navigate("/reports")}>Reportes</button>
<button onClick={() => navigate("/notifications")}>Avisos</button>
<button onClick={() => navigate("/schedule")}>horarios</button>
<button onClick={() => navigate("/tips")}>Consejos</button>
</div>
);
}
