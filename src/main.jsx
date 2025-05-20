import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import AppContextProvider from "./context/applicationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AppContextProvider>
);
