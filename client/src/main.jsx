import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import Hero from "./pages/main/Hero.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Hero /> */}
  </StrictMode>
);
