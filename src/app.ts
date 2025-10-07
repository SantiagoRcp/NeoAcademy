import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import { limiter } from "./config/rateLimit";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import adminRoutes from "./modules/admin/admin.routes";
import { errorMiddleware } from "./middlewares/errorMiddlewar";
import cookieParser from "cookie-parser";

const app = express();
app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Rutas
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to NeoAcademy API" });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Route Not Found", status: 404 });
});

app.use(errorMiddleware);

export default app;
