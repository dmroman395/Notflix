import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext'

import '../../css/signIn/signInForm.css'
import '../../css/signIn/signUpForm.css'

function SignUpForm({
    lang,
    formData,
    setFormData,
    setIsSignedIn,
    setNewUser,
    loading,
    setLoading,
}) {
    const { newUserSignUp } = useAuth()

    let signUp
    let email
    let password
    let account1
    let account2

    const createUser = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await newUserSignUp(formData.email, formData.password)
        } catch (err) {
            const code = err.code
            switch (code) {
                case 'auth/email-already-in-use':
                    alert(
                        'An account with this email address already exists. Please use another.'
                    )
                    break
                case 'auth/invalid-email':
                    alert('This email address is invalid.')
                    break
                default:
                    break
            }
        }
        setLoading(false)
    }

    const showSignInForm = () => {
        setNewUser(false)
    }

    if (lang === 'English') {
        signUp = 'Sign Up'
        email = 'Email Address'
        password = 'Password'
        account1 = 'Already have an account? '
        account2 = 'Sign in now.'
    } else {
        signUp = 'Suscríbete'
        email = 'Email'
        password = 'Contraseña'
        account1 = '¿Ya tienes una cuenta? '
        account2 = 'Inicia tu sesión ahora.'
    }

    return (
        <div className="form-container2">
            <form className="signUp-form" onSubmit={createUser}>
                <h1>{signUp}</h1>
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
                <button disabled={loading}>{signUp}</button>
                <p>
                    {account1}
                    <span onClick={showSignInForm}>{account2}</span>
                </p>
            </form>
        </div>
    )
}

export default SignUpForm
