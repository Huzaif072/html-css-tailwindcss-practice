import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import generalRoutes from "./routes/generalRoutes";
import fileRoutes from "./routes/fileRoutes";
import counterRoutes from "./routes/counterRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import { logRequest, requestLogger } from "./utils/logger";
import { sendError } from "./utils/errorHandler";

dotenv.config();

const app: Application = express();


// Middleware
app.use(express.json());
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Custom request logger
app.use((req, res, next) => {
    logRequest(req.method, req.url);
    next();
});

// Routes
app.use("/", generalRoutes);
app.use("/", fileRoutes);
app.use("/", counterRoutes);
app.use("/", taskRoutes);
app.use("/", userRoutes);

// Fallback 404
app.use((req, res) => {
    sendError(res, 404, "Route not found");
});

export default app;