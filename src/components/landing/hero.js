import React from 'react'
import EmailSignUp from './emailSignUp'
import logo from '../../images/Logo.png'
import '../../css/landing/hero.css'

function Hero({ sendToSignIn }) {

    const h1 = 'Unlimited movies, TV shows, and more.'
    const h3 = 'Watch anywhere. Cancel anytime.'
    const sign = 'Sign In'
    const hero = 'en'

    function signIn() {
        sendToSignIn()
    }

    return (
        <div className={`hero ${hero}`}>
            <div className="hero-overlay">
                <div className="top-bar">
                    <img id="logo" src={logo} alt="logo"></img>
                    <div className="lang-signin">
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
                        <EmailSignUp sendToSignIn={sendToSignIn}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
