import React from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./dashboard/App";
const root = createRoot(document.getElementById("popup-root"));
root.render(<Dashboard />);
