import { initializeApp } from "firebase/app"
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
})

const db = getFirestore()

export async function getUserWatchList(userId) {
        const docRef = doc(db, "UserWatchLists", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data()
            return data.movies
          } 
}

async function addToWatchList(movie, userId) {
    const initialData = await getUserWatchList(userId)
    if (initialData == undefined) {
        const newList = {
            movies: [movie]
        }
        await setDoc(doc(db,'UserWatchLists', userId), newList)
        const finalData = await getUserWatchList(userId)
        return finalData
    } else {
        const newData =  [...initialData, movie]
        const newDoc = {
            movies: newData
        }
        await setDoc(doc(db,'UserWatchLists', userId), newDoc)
        const finalData = await getUserWatchList(userId)
        return finalData
    }
}

async function removeFromWatchList(movie, userId) {
    const initialData = await getUserWatchList(userId)
    let index;

    initialData.forEach((item, i) => {
        if (item.id === movie.id) {
            index = i
        } 
    })

    initialData.splice(index,1)

    const newData = {
        movies: initialData
    }
    await setDoc(doc(db,'UserWatchLists', userId), newData)
    const finalData = await getUserWatchList(userId)
    return finalData
}

export async function handleWatchList(movie, userId, type) {
    let data;
    switch(type) {
        case 'add':
            data = await addToWatchList(movie, userId)
            break;
        case 'remove':
            data = await removeFromWatchList(movie, userId)
            break;
        default:
            break;
    }
    return data
}

export const auth = getAuth()
export default app
