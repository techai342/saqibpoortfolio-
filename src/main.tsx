import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import paperTex from "../public/images/paper-texture.jpg";

document.documentElement.style.setProperty("--paper-img", `url(${paperTex})`);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
