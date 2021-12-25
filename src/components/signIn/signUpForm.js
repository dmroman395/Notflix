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

    const [message, setMessage] = useState('You may use a fake email for demo purposes.')
    const { newUserSignUp } = useAuth()

    const signUp ='Sign Up'
    const email = 'Email Address'
    const password = 'Password'
    const account1 = 'Already have an account? '
    const account2 = 'Sign in now.'

    const createUser = async (e) => {
        e.preventDefault()
        try {
            await newUserSignUp(auth, formData.email, formData.password)
        } catch (err) {
            const code = err.code
            switch (code) {
                case 'auth/email-already-in-use':
                    setMessage('An account with this email address already exists. Please use another email or sign in.')
                    break
                case 'auth/invalid-email':
                    setMessage('This email address is invalid.')
                    break
                case 'auth/weak-password':
                    setMessage('Password must be at least 6 characters.')
                    break
                default:
                    break
            }
            const msgContainer = document.querySelector('#message')
            msgContainer.classList.remove('warning')
            msgContainer.classList.add('error')
        }
    }

    const showSignInForm = () => {
        setNewUser(false)
    }

    const msg = <div id='message' className='warning'>
    <p>{message}</p>
</div>

    return (
        <div className="form-container2">
            <form className="signUp-form" onSubmit={createUser}>
                <h1>{signUp}</h1>
                {msg}
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
                <button disabled={loading} >{signUp}</button>
                <p>
                    {account1}
                    <span onClick={showSignInForm}>{account2}</span>
                </p>
            </form>
        </div>
    )
}

export default SignUpForm
