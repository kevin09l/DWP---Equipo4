import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";
import { catchAsync } from "../utils/catchAsync.js";

export const register = catchAsync(async (req, res, next) => {
    // frontend uses spanish field names; normalize them here so service stays english
    const { nombre, direccion, medidor, ...rest } = req.body;
    const payload = {
        name: nombre || rest.name,
        address: direccion || rest.address,
        water_meter: medidor || rest.water_meter,
        // email and password should already be present in rest
        email: rest.email,
        password: rest.password
    };

    const userId = await authService.register(payload);

    // wrap everything in a standardized data payload
    successResponse(res, {
        statusCode: 201,
        message: "Usuario registrado correctamente",
        data: { userId }
    });
});

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    successResponse(res, {
        statusCode: 200,
        data: {
            accessToken: result.accessToken,
            user: result.user
        }
    });
});
