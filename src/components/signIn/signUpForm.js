import React, {useState} from 'react'
import { useAuth } from '../../contexts/authContext'
import { auth } from '../../firebase'

import '../../css/signIn/signInForm.css'
import '../../css/signIn/signUpForm.css'

function SignUpForm({
    formData,
    setFormData,
    setNewUser,
    loading,
    needsSignIn
}) {

    const [errorMessage, setErrorMessage] = useState('')
    const { newUserSignUp } = useAuth()

    const signUp ='Sign Up'
    const email = 'Email Address'
    const password = 'Password'
    const account1 = 'Already have an account? '
    const account2 = 'Sign in now.'

    const createUser = async (e) => {
        e.preventDefault()
        try {
            await newUserSignUp(auth, formData.email, formData.password, formData.profileName)
        } catch (err) {
            const code = err.code
            switch (code) {
                case 'auth/email-already-in-use':
                    setErrorMessage('An account with this email address already exists. Please use another email or sign in.')
                    break
                case 'auth/invalid-email':
                    setErrorMessage('This email address is invalid.')
                    break
                default:
                    break
            }
        }
    }

    const showSignInForm = () => {
        setNewUser(false)
    }

    const errMsg = <div className='error'>
    <p>{errorMessage}</p>
</div>

    return (
        <div className="form-container2">
            <form className="signUp-form" onSubmit={createUser}>
                <h1>{signUp}</h1>
                {errorMessage.length > 0 ? errMsg : null}
                <input
                    type="email"
                    placeholder={email}
                    defaultValue={needsSignIn.email}
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
                {/* <input
                    type="string"
                    placeholder='Netflix Profile Name'
                    onChange={(e) => {
                        setFormData({ ...formData, profileName: e.target.value })
                    }}
                /> */}
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
