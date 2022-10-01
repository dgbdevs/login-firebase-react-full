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
    const [userSimple, setUserSimple] = useState({ test: 'test' })
    const [loading, setLoading] = useState()

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    /* 
        setUserSimple({
            email: currentUser.email,
            emailVerified: currentUser.emailVerified,
            fullname: currentUser.displayName,
            photoURL: currentUser.photoURL,
            phoneNumber: currentUser.phoneNumber,
            uid: currentUser.uid
        })
     */

    const isLoggedIn = () => {
        setLoading(true)
        onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                dispatch(login(currentUser.toJSON()))
                setLoading(false)
                return
            } else {
                console.log('NO USER LOGGED IN')
            }
        })
    }

    //CHECK USER LOGGED IN
    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <>
            {user ?
                <>{children}</>
                :
                <Navigate to="/login" />
            }
        </>
    )

}

export default Index