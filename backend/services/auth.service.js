import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import * as authModel from "../models/user.model.js";

export const register = async (data) => {

    const { name, email, address, water_meter, password } = data;

    if (!name || !email || !address || !water_meter || !password) {
        throw new ApiError(400, "Todos los campos son obligatorios");
    }

    // do a single query to detect conflicts (email or water meter)
    const conflictUser = await authModel.findByEmailOrMeter(email, water_meter);
    if (conflictUser) {
        if (conflictUser.email === email) {
            throw new ApiError(400, "El correo ya está registrado");
        }
        if (conflictUser.water_meter === water_meter) {
            throw new ApiError(400, "El medidor ya está registrado");
        }
        // in case both match (shouldn't happen due to uniques) just throw generic
        throw new ApiError(400, "Usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const userId = await authModel.createUser({
        name,
        email,
        address,
        water_meter,
        password: hashedPassword,
        role: "user"
    });

    return userId;
};

export const login = async (email, password) => {

    const user = await authModel.findByEmail(email);

    if (!user) {
        throw new ApiError(401, "Credenciales inválidas");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Credenciales inválidas");
    }

    if (!user.is_active) {
        throw new ApiError(403, "Usuario deshabilitado");
    }

    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
        console.error("JWT secret environment variables are not set");
        throw new ApiError(500, "Configuración del servidor incompleta");
    }

    const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_EXPIRES }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_EXPIRES }
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await authModel.saveRefreshToken(user.id, refreshToken, expiresAt);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            role: user.role
        }
    };
};
