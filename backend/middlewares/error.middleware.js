export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // log full error object in dev so debugging is easier
    if (process.env.NODE_ENV === 'development') {
        console.error("ERROR stack:", err.stack || err);
    } else {
        console.error("ERROR:", err.message || err);
    }

    // Operational errors will have isOperational flag set by ApiError
    const message = err.message || "Error interno del servidor";

    res.status(statusCode).json({
        success: false,
        message
    });
};
