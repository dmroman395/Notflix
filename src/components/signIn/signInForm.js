import React from 'react'
import { useAuth } from '../../contexts/authContext'

import FBLogo from '../../images/fblogo.png'
import '../../css/signIn/signInForm.css'

function SignInForm({
    lang,
    formData,
    setFormData,
    setNewUser,
    loading,
    setIsSignedIn,
}) {
    const { userSignIn, currentUser } = useAuth()

    let signin
    let email
    let password
    let remember
    let help
    let fb
    let newNetflix
    let signup
    let recaptcha
    let learn
    let moreinfo1
    let moreinfo2
    let moreinfo3
    let link1
    let link2

    if (lang === 'English') {
        signin = 'Sign In'
        email = 'Email Address'
        password = 'Password'
        remember = 'Remember me'
        help = 'Need help?'
        fb = 'Login with Facebook'
        newNetflix = 'New to Netflix? '
        signup = 'Sign up now.'
        recaptcha =
            "This page is protected by Google reCAPTCHA to ensure you're not a bot. "
        learn = 'Learn more.'
        moreinfo1 =
            'The information collected by Google reCAPTCHA is subject to the Google '
        moreinfo2 = ' and '
        moreinfo3 =
            ', and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).'
        link1 = 'Privacy Policy'
        link2 = 'Terms of Service'
    } else {
        signin = 'Iniciar sesión'
        email = 'Email'
        password = 'Contraseña'
        remember = 'Recuérdame'
        help = '¿Necesitas ayuda?'
        fb = 'Iniciar sesión con Facebook'
        newNetflix = '¿Primera vez en Netflix? '
        signup = 'Suscríbete ya.'
        recaptcha =
            'Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot. '
        learn = 'Más info.'
        moreinfo1 =
            'La información recopilada por Google reCAPTCHA está sujeta a la '
        moreinfo2 = ' y a las '
        moreinfo3 =
            ' de Google, y se utiliza para proporcionar, mantener y mejorar el servicio de reCAPTCHA, así como para fines generales de seguridad (Google no la utiliza para personalizar publicidad).'
        link1 = 'Política de privacidad'
        link2 = 'Condiciones del servicio'
    }

    const showSignUp = () => {
        setNewUser(true)
    }

    const showMore = () => {
        const learnMore = document.querySelector('#learn')
        const moreInfo = document.querySelector('.moreinfo')

        learnMore.style.display = 'none'
        moreInfo.style.opacity = '1'
    }

    const signIn = async (e) => {
        e.preventDefault()

        try {
            await userSignIn(formData.email, formData.password)
            setIsSignedIn(true)
            console.log(currentUser)
        } catch (err) {
            const code = err.code
            switch (code) {
                case 'auth/invalid-email':
                    alert('This email address is invalid.')
                    break
                case 'auth/user-disabled':
                    alert('This account has been disabled.')
                    break
                case 'auth/user-not-found':
                    alert('No account exists with this email address.')
                    break
                case 'auth/wrong-password':
                    alert('Password is wrong. Please try again.')
                    break
                default:
                    break
            }
        }
    }

    return (
        <div className="form-container">
            <form className="signIn-form" onSubmit={signIn}>
                <h1>{signin}</h1>
                <input
                    type="email"
                    placeholder={email}
                    onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                    }}
                />
                <input
                    type="password"
                    placeholder={password}
                    onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value })
                    }}
                />
                <button disabled={loading}>{signin}</button>
                <div className="bottom-form">
                    <div className="check-rem">
                        <input type="checkbox" defaultChecked="true" />
                        <span>{remember}</span>
                    </div>
                    <a href="https://www.netflix.com/LoginHelp">{help}</a>
                </div>
            </form>
            <div className="container-bottom">
                <div className="fb-login">
                    <img src={FBLogo} id="fb-logo"></img>
                    <p>{fb}</p>
                </div>
                <p>
                    {newNetflix}
                    <span href="" className="signUp" onClick={showSignUp}>
                        {signup}
                    </span>
                </p>
                <p className="lighter">
                    {recaptcha}
                    <span className="link" id="learn" onClick={showMore}>
                        {learn}
                    </span>
                </p>
                <p className="lighter moreinfo">
                    {moreinfo1}
                    <a
                        href="https://policies.google.com/privacy"
                        className="link"
                    >
                        {link1}
                    </a>
                    {moreinfo2}
                    <a
                        href="https://policies.google.com/terms"
                        className="link"
                    >
                        {link2}
                    </a>
                    {moreinfo3}
                </p>
            </div>
        </div>
    )
}

export default SignInForm
