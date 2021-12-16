import React from 'react'
import EmailSignUp from './emailSignUp'
import LanguagePicker from '../shared/languagePicker'
import logo from '../../images/Logo.png'
import '../../css/landing/hero.css'

function Hero({ lang, setLang, sendToSignIn }) {
    let h1
    let h3
    let sign
    let hero

    if (lang === 'English') {
        h1 = 'Unlimited movies, TV shows, and more.'
        h3 = 'Watch anywhere. Cancel anytime.'
        sign = 'Sign In'
        hero = 'en'
    } else {
        h1 = 'Películas y series ilimitadas y mucho más.'
        h3 = 'Disfruta donde quieras. Cancela cuando quieras.'
        sign = 'Iniciar sesión'
        hero = 'es'
    }

    function signIn() {
        sendToSignIn()
    }

    return (
        <div className={`hero ${hero}`}>
            <div className="hero-overlay">
                <div className="top-bar">
                    <img id="logo" src={logo} alt="logo"></img>
                    <div className="lang-signin">
                        <LanguagePicker lang={lang} setLang={setLang} />
                        <button
                            className="button sign-in"
                            onClick={signIn}
                        >
                            {sign}
                        </button>
                    </div>
                </div>
                <div className="main-content">
                    <h1>{h1}</h1>
                    <h3>{h3}</h3>
                    <div className="signup">
                        <EmailSignUp lang={lang} sendToSignIn={sendToSignIn}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
