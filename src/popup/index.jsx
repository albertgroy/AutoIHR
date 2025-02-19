import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./pages/Popup";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("popup-root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<Popup />);
  } else {
    console.error("Could not find element with id 'popup-root'");
  }
});
