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


export default function Tips() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={7} />


<h1>Consejos de Ahorro de Agua</h1>


<p>Cierra la llave mientras te cepillas</p>
<p>Repara fugas en casa</p>


<button onClick={() => navigate("/home")}>Volver</button>
</div>
);
}