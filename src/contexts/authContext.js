import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
const { createUserProfile } = require('../controllers/userInfoController')

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)

    function newUserSignUp(authInst, email, password) {
        try {
            return createUserWithEmailAndPassword(authInst, email, password)
        } catch (e) {
            console.error(e)
        }
    }

    function userSignIn(authInst, email, password) {
        try {
            return signInWithEmailAndPassword(authInst, email, password)
        } catch (e) {
            console.error(e)
        }
    }
    function userSignOut() {
        try {
            return signOut(auth)
        } catch (e) {
            console.error(e)
        }
    }
    function resetPassword(authInst, email) {
        try{
            return sendPasswordResetEmail(authInst, email)
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        newUserSignUp,
        userSignIn,
        userSignOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}