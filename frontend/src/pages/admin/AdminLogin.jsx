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


export default function AdminLogin() {
const navigate = useNavigate();


return (
<div>
<KeyboardNav routes={routes} currentIndex={0} />


<h1>Login Administrador</h1>


<input placeholder="Usuario Admin" />
<br />
<input placeholder="Contraseña" type="password" />
<br />


<button onClick={() => navigate("/admin/dashboard")}>
Entrar
</button>
</div>
);
}