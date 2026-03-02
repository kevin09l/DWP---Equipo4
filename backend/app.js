import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"; 
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// allow our frontend origin and send cookies for auth (refresh token)
// NB: vite sometimes picks a different port (5173, 5174, …) so we allow
// any localhost:517x address and also permit a custom FRONTEND_URL via env.
import { responseTime } from "./middlewares/responseTime.middleware.js";

app.use(responseTime);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. curl, mobile apps)
      if (!origin) return callback(null, true);
      const allowed = process.env.FRONTEND_URL || '';
      const isLocal517 = origin.startsWith('http://localhost:517');
      const isLocal3010 = origin.startsWith('http://localhost:3010');
      const isRailway = origin.startsWith('https://dwp-equipo4-production.up.railway.app');
      if (origin === allowed || isLocal517 || isLocal3010 || isRailway) {
        return callback(null, true);
      }
      console.warn('CORS blocked origin', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// any other /api path that wasn't matched should return 404 JSON
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "Endpoint no encontrado" });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);



const PORT = process.env.PORT || 3010;

// log some environment info for debugging
console.log("Inicio del servidor con variables:", {
  PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  FRONTEND_URL: process.env.FRONTEND_URL,
});

// only start listening when not testing; tests can import app and run custom server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

export default app;
