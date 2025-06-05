import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ErrorBoundary } from "react-error-boundary";

import { App } from "#App.tsx";
import { Fallback } from "#Fallback.tsx";
import { Toaster } from "#components/Toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <Toaster />
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
