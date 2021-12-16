import { doc, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore()

export async function createUserProfile(userId, profileName) {
    // await setDoc(doc(db,'UserProfileNames',userId), {
    //     ProfileName: profileName
    // })
}