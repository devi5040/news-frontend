import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 ">
      <App />
    </div>
  </StrictMode>
);
