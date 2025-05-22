import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import AppContextProvider from "./context/applicationContext";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <AppContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppContextProvider>
  </CookiesProvider>
);
