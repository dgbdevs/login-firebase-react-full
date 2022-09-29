import React from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/user/userSlice'
import { useEffect } from 'react';
import { useState } from 'react';


const Index = ({ children }) => {

    const auth = getAuth();
    const navigate = useNavigate()
    const [userSimple, setUserSimple] = useState({test:'test'})

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    

    //CHECK USER LOGGED IN
    useEffect(() => {
        onAuthStateChanged(auth,  currentUser => {
            setUserSimple({
                email: currentUser.email,
                emailVerified: currentUser.emailVerified,
                fullname: currentUser.displayName,
                photoURL: currentUser.photoURL,
                phoneNumber: currentUser.phoneNumber,
                uid: currentUser.uid
            })            
        }) 
        dispatch(login(userSimple))       
    }, [])

   

    if (!user || user == {}) return <Navigate to="/login" />

    return <>{children}</>


}

export default Index