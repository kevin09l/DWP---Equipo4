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


export default function Register() {
const navigate = useNavigate();



return (
<div>
<KeyboardNav routes={routes} currentIndex={1} />


<h1>Registro Usuario</h1>


<input placeholder="Nombre" />
<br />
<input placeholder="Correo" />
<br />
<input placeholder="Contraseña" type="password" />
<br />


<button onClick={() => navigate("/")}>Volver Login</button>
<button onClick={() => navigate("/home")}>Crear Cuenta</button>
</div>
);
}