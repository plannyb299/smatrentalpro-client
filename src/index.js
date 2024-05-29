import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import router from "./routes"; // Import the router from routes.js
import { AuthContextProvider } from "./context/AuthContext.jsx";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <ErrorBoundary>
      <RouterProvider router={router} />
     </ErrorBoundary>
    </AuthContextProvider>
  </React.StrictMode>
);
