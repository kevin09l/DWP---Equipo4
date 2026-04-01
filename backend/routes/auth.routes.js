import { Router } from "express";
import { body } from "express-validator";

import {
    register, login,refresh, logout,logoutAll,forgotPassword,resetPassword} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

const sanitizeText = (value) =>
    String(value ?? "")
        .replace(/[<>]/g, "")
        .trim();

router.post(
    "/register",
    body("email")
        .isEmail()
        .withMessage("Email invalido")
        .normalizeEmail()
        .isLength({ max: 120 })
        .withMessage("El email no puede exceder 120 caracteres"),
    body("password")
        .isLength({ min: 8, max: 72 })
        .withMessage("La contrasena debe tener entre 8 y 72 caracteres")
        .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
        .withMessage("La contrasena debe incluir al menos una letra y un numero")
        .trim(),
    body("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre debe tener entre 2 y 100 caracteres")
        .matches(/^[A-Za-z\\s'.-]+$/)
        .withMessage("El nombre contiene caracteres no permitidos")
        .customSanitizer(sanitizeText),
    body("direccion")
        .notEmpty()
        .withMessage("La direccion es obligatoria")
        .isLength({ min: 5, max: 180 })
        .withMessage("La direccion debe tener entre 5 y 180 caracteres")
        .customSanitizer(sanitizeText),
    body("medidor")
        .notEmpty()
        .withMessage("El medidor es obligatorio")
        .isLength({ min: 3, max: 30 })
        .withMessage("El medidor debe tener entre 3 y 30 caracteres")
        .matches(/^[A-Za-z0-9-]+$/)
        .withMessage("El medidor solo permite letras, numeros y guiones")
        .trim(),
    register
);

router.post(
    "/login",
    body("email")
        .isEmail()
        .withMessage("Email invalido")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6, max: 72 })
        .withMessage("La contrasena debe tener entre 6 y 72 caracteres")
        .trim(),
    login
);

router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/logout-all", verifyToken, logoutAll);

router.post(
    "/forgot-password",
    body("email")
        .isEmail()
        .withMessage("Email invalido")
        .normalizeEmail(),
    forgotPassword
);

router.post(
    "/reset-password",
    body("token")
        .notEmpty()
        .withMessage("El token es obligatorio")
        .trim(),
    body("newPassword")
        .isLength({ min: 8, max: 72 })
        .withMessage("La contrasena debe tener entre 8 y 72 caracteres")
        .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
        .withMessage("La contrasena debe incluir al menos una letra y un numero")
        .trim(),
    resetPassword
);

export default router;
