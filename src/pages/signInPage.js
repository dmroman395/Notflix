import React, { useState } from 'react'
import logo from '../images/Logo.png'
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'
import Footer from '../components/shared/footer'
import SignInForm from '../components/signIn/signInForm'
import SignUpForm from '../components/signIn/signUpForm'

import '../css/signIn/signIn.css'

function SignInPage({ needsSignIn }) {
    const [formData, setFormData] = useState({})
    const [newUser, setNewUser] = useState(needsSignIn.email ? true : false)
    const [loading, setLoading] = useState(false)


    return (
        <div className='signIn'>
            <div className="content">
                <div className="logo-bar">
                    <img id="logo" src={logo} alt="logo"></img>
                </div>
                {newUser ? (
                    <SignUpForm                        
                        formData={formData}
                        setFormData={setFormData}
                        setNewUser={setNewUser}
                        loading={loading}
                        setLoading={setLoading}
                        needsSignIn={needsSignIn}
                    />
                ) : (
                    <SignInForm                        
                        formData={formData}
                        setFormData={setFormData}
                        setNewUser={setNewUser}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}
                <Footer
                    data={footerDataEn}
                    style={'footer2'}
                />
            </div>
        </div>
    )
}

export default SignInPage
