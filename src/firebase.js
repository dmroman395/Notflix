import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth'

const app = initializeApp({
    apiKey: 'AIzaSyBquhfiKngHEhgnfCvqNOEGA9a_jUh-EIU',
    authDomain: 'notflix-a5c5d.firebaseapp.com',
    projectId: 'notflix-a5c5d',
    storageBucket: 'notflix-a5c5d.appspot.com',
    messagingSenderId: '644622002476',
    appId: '1:644622002476:web:db55bd60e1c460dde06489',
    measurementId: 'G-SK3F0NKCHL',
})

export const auth = getAuth()
export default app;
