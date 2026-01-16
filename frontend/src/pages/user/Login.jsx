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


export default function Login() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={0} />


<h1>Inicio de Sesión</h1>


<input placeholder="Correo" />
<br />
<input placeholder="Contraseña" type="password" />
<br />

<button onClick={() => navigate("/home")}>Ingresar</button>
<button onClick={() => navigate("/register")}>Registrarse</button>
</div>
);
}