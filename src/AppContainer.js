import React from "react";
import { AuthProvider } from './contexts/authContext'
import App  from "./App";
import LandingPage from './pages/landing'
import SignInPage from './pages/signInPage'
import Header from './components/shared/header'
import Main from './pages/main'
import ExploreAll from './pages/exploreAll'

export function AppContainer() {
    return (
        <AuthProvider>
              <App/>
        </AuthProvider>
    )
}
