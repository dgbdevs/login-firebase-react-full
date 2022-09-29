import {firestore} from '../firebaseConfig'
import {doc,collection,addDoc,setDoc,getDoc, updateDoc} from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import {login,logout} from '../features/user/userSlice'


export const createUser = (currentUser) => {

    const user = {
        uid:currentUser.uid,
        fullname: currentUser.displayName,
        avatar: currentUser.photoURL,
        email:currentUser.email,
        emailVerified:currentUser.emailVerified,
    }
    const addUser = async () =>{
         const docRef = doc(firestore,'users',currentUser.uid)
        await setDoc(docRef,user)
        .then(()=>{console.log('usuario cargado')})
        .catch((err)=>console.log(err))     
    }

    return(
       addUser()
        )
}



export const loadUser = (uid) => {  
    
    const load = async () =>{       
        const docRef = doc(firestore,'users',uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return(docSnap.data)
          } else {
            return null
          }
          
    }

    return(
       load()
        )
}