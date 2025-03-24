import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/index";
import "./styles/global.css";

const App = () => {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
};

export default App;
