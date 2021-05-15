import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
    apiKey: 'AIzaSyBquhfiKngHEhgnfCvqNOEGA9a_jUh-EIU',
    authDomain: 'notflix-a5c5d.firebaseapp.com',
    projectId: 'notflix-a5c5d',
    storageBucket: 'notflix-a5c5d.appspot.com',
    messagingSenderId: '644622002476',
    appId: '1:644622002476:web:db55bd60e1c460dde06489',
    measurementId: 'G-SK3F0NKCHL',
}

firebase.initializeApp(firebaseConfig)

const ui = new firebaseui.auth.AuthUI(firebase.auth())

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none'
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'https://notflix.dev',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
}

ui.start('#firebaseui-auth-container', uiConfig)

const currentUser = firebase.auth().currentUser

export function App() {
    return (
        <div>
            <div id="firebaseui-auth-container"></div>
            <h1>{currentUser}</h1>
        </div>
    )
}
