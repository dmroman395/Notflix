import React, { useState } from 'react'
import logo from '../images/Logo.png'
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'
import Footer from '../components/shared/footer'
import SignInForm from '../components/signIn/signInForm'
import SignUpForm from '../components/signIn/signUpForm'

import '../css/signIn/signIn.css'

function SignInPage({ lang, setLang, needsSignIn }) {
    const [formData, setFormData] = useState({})
    const [newUser, setNewUser] = useState(needsSignIn.email ? true : false)
    const [loading, setLoading] = useState(false)

    let signin
    let hero

    if (lang === 'English') {
        signin = 'Sign In'
        hero = 'en'
    } else {
        signin = 'Iniciar'
        hero = 'es'
    }

    return (
        <div className={`signIn ${hero}`}>
            <div className="content">
                <div className="logo-bar">
                    <img id="logo" src={logo} alt="logo"></img>
                </div>
                {newUser ? (
                    <SignUpForm
                        lang={lang}
                        formData={formData}
                        setFormData={setFormData}
                        setNewUser={setNewUser}
                        loading={loading}
                        setLoading={setLoading}
                        needsSignIn={needsSignIn}
                    />
                ) : (
                    <SignInForm
                        lang={lang}
                        formData={formData}
                        setFormData={setFormData}
                        setNewUser={setNewUser}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}

                {lang === 'English' ? (
                    <Footer
                        lang={lang}
                        setLang={setLang}
                        data={footerDataEn}
                        style={'footer2'}
                    />
                ) : (
                    <Footer
                        lang={lang}
                        setLang={setLang}
                        data={footerDataEs}
                        style={'footer2'}
                    />
                )}
            </div>
        </div>
    )
}

export default SignInPage
