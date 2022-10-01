import { firestore } from '../firebaseConfig'
import { doc, collection, addDoc, setDoc, getDoc, updateDoc } from 'firebase/firestore'


export function createUser (user) {

    const load = async () => {
        const docRef = doc(firestore, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log('usuario ya existente')
        } else {
            await setDoc(doc(firestore,'users',user.uid),Object.fromEntries(Object.entries(user).filter(value => value[1])))
            console.log('usuario creado')
        }
    }

    return(load())
    
}



export const loadUser = (uid) => {

    const load = async () => {
        const docRef = doc(firestore, 'users', uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return null
        }

    }

    return (
        load()
    )
}