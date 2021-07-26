import React, { useState } from 'react'
import { AuthProvider } from './contexts/authContext'
import LandingPage from './pages/landing'
import SignInPage from './pages/signInPage'
import Main from './pages/main'
import './css/app/App.css'

export function App() {
    const [lang, setLang] = useState('English')
    const [isSignedIn, setIsSignedIn] = useState(false)

    return (
        <AuthProvider>
            <Main lang={lang} setLang={setLang}/>
        </AuthProvider>
    )
}
