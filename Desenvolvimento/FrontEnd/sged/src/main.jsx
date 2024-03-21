import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SessionProvider } from "./object/service/session";
import { ApiProvider } from "./object/service/api";
import { MontageProvider } from "./object/modules/montage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MontageProvider>
      <App />
    </MontageProvider>
  </React.StrictMode>
);
