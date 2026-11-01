import type { HealthResponse } from "@cwad/types";
import { env } from "../config/env.js";

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${env.VITE_API_URL}/api/v1/health`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}