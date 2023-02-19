import React from "react";
import { createRoot } from "react-dom/client";

import Index from "../pages/home/Index";

const root = createRoot(document.getElementById("home-index-root"));

root.render(<Index />);
