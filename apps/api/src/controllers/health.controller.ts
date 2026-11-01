import type { Request, Response } from "express";
import type { HealthResponse } from "@cwad/types";

export function healthController(_req: Request, res: Response<HealthResponse>) {
  res.status(200).json({
    status: "ok",
    service: "api",
    timestamp: new Date().toISOString(),
  });
}

export function readinessController(_req: Request, res: Response) {
  res.status(200).json({
    status: "ready",
    service: "api",
  });
}