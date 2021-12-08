import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore()

export async function getUserWatchList(userId) {
        const docRef = doc(db, "UserWatchLists", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data()
            return data.data
          } 
}

async function addToWatchList(movie, userId, contentType) {
    const initialData = await getUserWatchList(userId)
    const content = {
        ...movie,
        contentType: contentType
    }
    if (initialData == undefined) {
        const newList = {
            data: [content]
        }
        await setDoc(doc(db,'UserWatchLists', userId), newList)
        const finalData = await getUserWatchList(userId)
        return finalData
    } else {
        const newData =  [...initialData, content]
        const newDoc = {
            data: newData
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
        data: initialData
    }
    await setDoc(doc(db,'UserWatchLists', userId), newData)
    const finalData = await getUserWatchList(userId)
    return finalData
}

export async function handleWatchList(movie, userId, type, contentType) {
    let data;
    switch(type) {
        case 'add':
            data = await addToWatchList(movie, userId,contentType)
            break;
        case 'remove':
            data = await removeFromWatchList(movie, userId)
            break;
        default:
            break;
    }
    return data
}