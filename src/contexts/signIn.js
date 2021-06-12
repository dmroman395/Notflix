import firebase from 'firebase/app'
import 'firebase/auth'

export default function signIn(email, password) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCred) => {
            const user = userCred.user
            console.log(user)
            console.log(user.email)
        })
        .catch((err) => {
            const errorCode = err.code
            const errorMessage = err.message
        })
}
