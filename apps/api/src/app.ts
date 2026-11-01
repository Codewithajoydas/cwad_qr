import cors from "cors";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";

import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { notFoundMiddleware } from "./middlewares/not-found.js";
import { healthRouter } from "./routes/health.routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp());

app.get("/", (_req, res) => {
  res.json({
    name: "CWAD Fullstack API",
    version: "1.0.0",
    status: "running",
  });
});

app.use("/api/v1", healthRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);