import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";
import { Center, Loader } from "@mantine/core";
import { Analytics } from "@vercel/analytics/react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <Center>
          <Loader size="xs" />
        </Center>
      }
    >
      <App />
      <Analytics />
    </React.Suspense>
  </React.StrictMode>
);
