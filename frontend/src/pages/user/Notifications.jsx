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


export default function Notifications() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={5} />


<h1>Avisos y Notificaciones</h1>


<p>Corte programado mañana 9:00 AM</p>
<p>Servicio restablecido en zona centro</p>


<button onClick={() => navigate("/home")}>Volver</button>
</div>
);
}