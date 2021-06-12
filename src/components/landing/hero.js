import React from 'react'
import EmailSignUp from './emailSignUp'
import LanguagePicker from '../shared/languagePicker'
import logo from '../../images/Logo.png'
import '../../css/landing/hero.css'

function Hero({ lang, setLang }) {
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

    return (
        <div className={`hero ${hero}`}>
            <div className="overlay">
                <div className="top-bar">
                    <img id="logo" src={logo} alt="logo"></img>
                    <div className="lang-signin">
                        <LanguagePicker lang={lang} setLang={setLang} />
                        <a
                            className="button sign-in"
                            href="https://notflix.dev/login"
                        >
                            {sign}
                        </a>
                    </div>
                </div>
                <div className="main-content">
                    <h1>{h1}</h1>
                    <h3>{h3}</h3>
                    <div className="signup">
                        <EmailSignUp lang={lang} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
