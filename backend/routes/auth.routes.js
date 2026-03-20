import { Router } from "express";
import { register, login, refresh, logout, logoutAll } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
router.post(
"/register",

body("email")
.isEmail()
.withMessage("Email inválido")
.normalizeEmail(),

body("password")
.isLength({ min: 6 })
.withMessage("La contraseña debe tener al menos 6 caracteres")
.trim(),

body("nombre")
.notEmpty()
.withMessage("El nombre es obligatorio")
.trim()
.escape(),

body("direccion")
.notEmpty()
.withMessage("La dirección es obligatoria")
.trim()
.escape(),

body("medidor")
.notEmpty()
.withMessage("El medidor es obligatorio")
.trim()
.escape(),

register
);
router.post(
"/login",

body("email")
.isEmail()
.withMessage("Email inválido")
.normalizeEmail(),

body("password")
.isLength({ min: 6 })
.withMessage("La contraseña debe tener al menos 6 caracteres")
.trim(),

login
);

router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/logout-all", verifyToken, logoutAll);

export default router;
