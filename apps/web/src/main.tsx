import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// eslint-disable-next-line
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
