import { Router } from "express";
import { body, validationResult } from "express-validator";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyToken);
router.use(checkRole(["admin"]));

router.get("/reports", (req, res) => {
    res.json({ message: "Cargando reportes para el administrador..." });
});

router.get("/users", (req, res) => {
    res.json({ message: "Lista de usuarios de Voz Comunal" });
});

router.post("/approve-report/:id", (req, res) => {
    res.json({ message: "Reporte aprobado con exito" });
});

router.post(
    "/reports",
    checkRole(["admin", "tecnico"]),
    body("title")
        .trim()
        .isLength({ min: 5, max: 120 })
        .withMessage("El titulo debe tener entre 5 y 120 caracteres")
        .matches(/^[^<>]*$/)
        .withMessage("El titulo contiene caracteres no permitidos"),
    body("description")
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("La descripcion debe tener entre 10 y 1000 caracteres")
        .matches(/^[^<>]*$/)
        .withMessage("La descripcion contiene caracteres no permitidos"),
    body("priority")
        .optional()
        .isIn(["baja", "media", "alta"])
        .withMessage("La prioridad no es valida"),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        return res.status(201).json({
            success: true,
            message: "Reporte validado correctamente"
        });
    }
);

export default router;
