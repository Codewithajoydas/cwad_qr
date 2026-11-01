import { useEffect, useState } from "react";
import type { HealthResponse } from "@cwad/types";
import { getHealth } from "../lib/api";

export function HealthCard() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth().then(setData).catch((reason: Error) => setError(reason.message));
  }, []);

  if (error) {
    return <div className="card error">API unavailable: {error}</div>;
  }

  if (!data) {
    return <div className="card">Checking API...</div>;
  }

  return (
    <div className="card">
      <span className="status">API {data.status}</span>
      <p>{data.service}</p>
      <small>{data.timestamp}</small>
    </div>
  );
}