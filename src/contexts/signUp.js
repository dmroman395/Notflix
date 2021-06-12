import firebase from 'firebase/app'
import 'firebase/auth'

export default function newUserSignUp(email, password) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCred) => {
            const user = userCred.user
            return user
        })
        .catch((err) => {
            const errorCode = err.code
            const errorMessage = err.message
        })
}
