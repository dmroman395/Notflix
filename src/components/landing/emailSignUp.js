import React, { useState } from 'react'
import arrow from '../../images/right-chevron.png'
import '../../css/landing/emailSignUp.css'

function EmailSignUp({ lang, sendToSignIn }) {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    let h5
    let placeholder
    let button

    if (lang === 'English') {
        h5 =
            'Ready to watch? Enter your email to create or restart your membership.'
        placeholder = 'Email Address'
        button = 'Get Started'
    } else {
        h5 =
            '¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.'
        placeholder = 'Email'
        button = 'Comenzar'
    }

    function formValidation() {
        let err = ''

        if (email === '') {
            err = 'Email is required!'
        }

        if (err) {
            setEmailError(err)
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = formValidation()
        if (isValid) {
            setEmailError('')
            setEmail('')
            sendToSignIn(email)
        }
    }

    return (
        <div className="container">
            <h5>{h5}</h5>
            <div className="formContainer">
                <form onSubmit={handleSubmit} className="get-started">
                    <input
                        type="email"
                        placeholder={placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <button>
                        <span>{button}</span>
                        <img src={arrow}></img>
                    </button>
                    <p className="error">{emailError}</p>
                </form>
            </div>
        </div>
    )
}

export default EmailSignUp
