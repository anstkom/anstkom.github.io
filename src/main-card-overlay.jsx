import React from "react";
import { createRoot } from "react-dom/client";
import TimelineCardOverlay from "./TimelineCardOverlay.jsx?native-slider-v1";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TimelineCardOverlay />
  </React.StrictMode>
);
