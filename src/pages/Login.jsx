import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Label } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Errormsg from '../components/Errormsg'

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [err, setErr] = useState(null)
    const [passView, setPassView] = useState(false)
    const navigate = useNavigate()

    //GOOGLE LOGIN & CREATE
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then(() => {
                navigate('/')})
            .catch((error) => console.error(error))
        
    }

    //LOGIN
    const handleLogin = async (e) => {
        e.preventDefault()
        await setPersistence(auth, browserLocalPersistence)
        await signInWithEmailAndPassword(auth, user.email, user.password)
            .then(() => { navigate('/') })
            .catch((error) => {
                setErr(error.code)
                setTimeout(() => { setErr(null) }, 2000)
            })
    }

    const showPass = () => {
        if (passView) {
            document.getElementsByName('password')[0].type = 'text'
        } else {
            document.getElementsByName('password')[0].type = 'password'
        }
    }
    useEffect(() => {
        showPass()
    }, [passView])

    useEffect (()=>{
        onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
               navigate('/')}
        })

    },[])


    return (
        <div>

            <div>
                <div className='form-login'>

                    <Form onSubmit={(e) => handleLogin(e)}>
                        <h5 style={{ textAlign: 'center' }}>{'<DGB/>'}</h5>
                        {err ?
                            <>
                                <Errormsg err={err} />
                            </>
                            :
                            <></>
                        }

                        <Label>Correo</Label>
                        <div className="email">
                            <input required type='email' value={user.email} name='email' onChange={(e) => setUser({ ...user, email: e.target.value })} ></input>
                        </div>
                        <Label>Contraseña</Label>
                        <div className="password">
                            <input required type='password' value={user.password} name='password' onChange={(e) => setUser({ ...user, password: e.target.value })} ></input>
                            <div className="eye" onClick={() => setPassView(!passView)}>
                                {passView ?
                                    <FaEyeSlash />
                                    :
                                    <FaEye />
                                }
                            </div>
                        </div>
                        <br></br>
                        <Button color='primary' type='submit' block >Iniciar Sesión</Button>

                        <div className='form-login-footer'>
                            <Link to={'/resetpwd'}>Olvidaste tu contraseña?</Link>
                            <Link to={'/signup'}>Registrate</Link>
                        </div>
                    </Form>


                    <button className='btnGoogle' onClick={() => googleLogin()}>
                        <FcGoogle size='25' />
                      <div>Login con Google</div>
                    </button>
                </div>
            </div>

        </div>

    )
}

export default Login