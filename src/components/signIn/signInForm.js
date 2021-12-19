import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { auth } from '../../firebase'

import FBLogo from '../../images/fblogo.png'
import '../../css/signIn/signInForm.css'

function SignInForm({
    formData,
    setFormData,
    setNewUser,
    loading,
}) {
    const [errorMessage, setErrorMessage] = useState('')
    const [needsReset, setNeedsReset] = useState(false)

    const { userSignIn, resetPassword } = useAuth()

    const signin = 'Sign In'
    const email = 'Email Address'
    const password = 'Password'
    const remember = 'Remember me'
    const help = 'Need help?'
    const fb = 'Login with Facebook'
    const newNetflix = 'New to N0tflix? '
    const signup = 'Sign up now.'
    const recaptcha = "This page is protected by Google reCAPTCHA to ensure you're not a bot. "
    const learn = 'Learn more.'
    const moreinfo1 = 'The information collected by Google reCAPTCHA is subject to the Google '
    const moreinfo2 = ' and '
    const moreinfo3 = ', and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).'
    const link1 = 'Privacy Policy'
    const link2 = 'Terms of Service'

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
            await userSignIn(auth, formData.email, formData.password)
        } catch (err) {
            const code = err.code
            switch (code) {
                case 'auth/invalid-email':
                    setErrorMessage('This email address is invalid.')
                    break
                case 'auth/user-disabled':
                    setErrorMessage('This account has been disabled.')
                    break
                case 'auth/user-not-found':
                    setErrorMessage('No account exists with this email address.')
                    break
                case 'auth/wrong-password':
                    setErrorMessage('Password is wrong. Please try again.')
                    setNeedsReset(true)
                    break
                case 'auth/email-already-exists':
                    setErrorMessage('An account with this email address already exists. Please use a different email, or sign in.')
                    break
                default:
                    break
            }
        }
    }

    async function reset(e) {
        e.preventDefault()
        const message = document.getElementById('message')
        message.classList.remove('error')
        message.classList.add('success')
        await resetPassword(auth, formData.email)
        setErrorMessage('An email to reset your password has been sent. Please check your inbox.')
    }

    const errMsg = <div className='error' id='message'>
        <p>{errorMessage}</p>
    </div>

    return (
        <div className="form-container">
            <form className="signIn-form" >
                <h1>{signin}</h1>
                {errorMessage.length > 0 ? errMsg : null}
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
                <button disabled={loading} onClick={e => signIn(e)}>{signin}</button>
                {needsReset ? <button className='reset' onClick={e => reset(e)}>Reset your password</button> : null}
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
