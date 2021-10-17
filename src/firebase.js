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
            return data
          } else {
              const data = {
                  movies: []
              }
            const newWatchList = await setDoc(doc(db, "UserWatchLists", userId), data)
            return newWatchList
        }
}

async function addToWatchList(movie, userId) {
    const data = await getUserWatchList(userId)
    if (data == undefined) {
        const newList = {
            movies: [movie]
        }
        await setDoc(doc(db,'UserWatchLists', userId), newList)
    } else {
        const newData =  [...data.movies, movie]
        const newDoc = {
            movies: newData
        }
        await setDoc(doc(db,'UserWatchLists', userId), newDoc)
    }
}

async function removeFromWatchList(movie, userId) {
    const data = await getUserWatchList(userId)
    let index;
    for (let [i,item] of data.movies.entries()) {
        if (item.id == movie.id)
        index = i
    }
    const newMovies = data.movies.splice(index,1)

    const newData = {
        movies: newMovies
    }
    await setDoc(doc(db,'UserWatchLists', userId), newData)
}

export async function handleWatchList(movie, userId, type) {
    switch(type) {
        case 'add':
            addToWatchList(movie, userId)
            break;
        case 'remove':
            removeFromWatchList(movie, userId)
            break;
        default:
            break;
    }
}

export const auth = getAuth()
export default app
