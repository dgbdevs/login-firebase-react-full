import React from 'react'
import { Button, Navbar, NavbarBrand } from 'reactstrap'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/user/userSlice'
import { Navigate, useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { createUser, loadUser } from '../functions/handleUser';
import { useEffect } from 'react';

const Home = () => {
    const user = useSelector((state) => state.user.value)
    const auth = getAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await signOut(auth)
            .then(() => {
                console.log('salido')
                navigate('/')
                dispatch(logout())
            })
            .catch((err) => console.log(err))
    }

    useEffect(()=>{
        createUser(user)
        loadUser(user.uid)
    },[])

    return (

        <div className='home'>
            <Navbar
                className="navbar"
                color="dark"
                dark            >
                <NavbarBrand href="/">
                    <b>
                        {'</>'}
                        DGB
                    </b>
                </NavbarBrand>
                <div>
                    <div className='username'>
                        Bienvenido {user ?
                            <>{user.fullname}</>
                            :
                            <>{user.email}</>
                        }
                        <Avatar/>
                        <Button outline size='sm' color='danger' onClick={() => handleLogout()}>SALIR</Button>
                    </div>
                </div>
            </Navbar>

        </div >
    )
}

export default Home