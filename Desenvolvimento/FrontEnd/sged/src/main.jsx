import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MontageProvider } from "./object/modules/montage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MontageProvider>
      <App />
    </MontageProvider>
  </React.StrictMode>
);
