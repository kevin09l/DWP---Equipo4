import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { body } from "express-validator";

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

export default router;
