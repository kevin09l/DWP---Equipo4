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


export default function Schedule() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={6} />


<h1>Horarios de Agua</h1>


<p>Lunes a Viernes: 6 AM - 12 PM</p>
<p>Sábado: 8 AM - 11 AM</p>


<button onClick={() => navigate("/home")}>Volver</button>
</div>
);
}