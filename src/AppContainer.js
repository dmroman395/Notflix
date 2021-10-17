import React from "react";
import { AuthProvider } from './contexts/authContext'
import App  from "./App";

export function AppContainer() {
    return (
        <AuthProvider>
            <App/>
        </AuthProvider>
    )
}
