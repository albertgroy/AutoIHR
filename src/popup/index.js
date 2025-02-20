import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./pages/Popup";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<Popup />);
