import { createRoot } from "react-dom/client";
import { Fragment } from "react";
import App from "../components/app.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
    <App />
);