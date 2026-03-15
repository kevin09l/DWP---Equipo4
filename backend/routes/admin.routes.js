import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// --- PROTECCIÓN GLOBAL ---
// Todo lo que definas debajo de estas dos líneas requerirá Token Y Rol Admin
router.use(verifyToken);
router.use(checkRole(["admin"]));

// --- RUTAS PROTEGIDAS ---
router.get("/reports", (req, res) => {
    res.json({ message: "Cargando reportes para el administrador..." });
});

router.get("/users", (req, res) => {
    res.json({ message: "Lista de usuarios de Voz Comunal" });
});

router.post("/approve-report/:id", (req, res) => {
    res.json({ message: "Reporte aprobado con éxito" });
});

export default router;