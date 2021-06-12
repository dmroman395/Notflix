import React, { useState } from 'react'
import { AuthProvider } from './contexts/authContext'
import LandingPage from './pages/landing'
import SignInPage from './pages/signInPage'
import Main from './pages/main'
import './css/app/App.css'

export function App() {
    const [lang, setLang] = useState('English')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    return (
        <AuthProvider>
            <div>
                {isSignedIn ? (
                    <Main currentUser={currentUser} />
                ) : (
                    <SignInPage
                        lang={lang}
                        setLang={setLang}
                        setCurrentUser={setCurrentUser}
                        setIsSignedIn={setIsSignedIn}
                    />
                )}
            </div>
        </AuthProvider>
    )
}
