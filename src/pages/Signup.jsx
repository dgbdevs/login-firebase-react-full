import React, { useState, useEffect } from 'react'
import { Button, Form, Label, Input } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Errormsg from '../components/Errormsg'
import { createUser } from '../functions/handleUser'

const Signup = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [check, setCheck] = useState(false)
    const [err, setErr] = useState(null)
    const [passView, setPassView] = useState(false)

    const navigate = useNavigate()

   
    //SiGNUP
    const handleSignUp = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(() => {   
                navigate('/')
                setUser({
                    email: '',
                    password: ''
                })
            })
            .catch((error) => {
                console.error(error)
                setErr(error.code)
                setTimeout(()=>{setErr(null)},2000)


            })

        document.getElementById('checkpass').value = ''
    }
    const showPass = () => {
        if (passView) {
            document.getElementsByName('password')[0].type = 'text'
            document.getElementsByName('password2')[0].type = 'text'
        } else {
            document.getElementsByName('password')[0].type = 'password'
            document.getElementsByName('password2')[0].type = 'password'
        }
    }
    useEffect(() => {
        showPass()
    }, [passView])

    //PASSWORD CHECK
    const passCheck = (pass) => {
        if (pass === user.password) {
            setCheck(true)
            document.getElementById('btnSU').removeAttribute("disabled")

        } else {
            setCheck(false)
            document.getElementById('btnSU').setAttribute("disabled", "disabled")

        }
    }

    useEffect(() => { passCheck('init') }, [user])


    return (
        <div>
            <div>
                <div className='form-login'>
                    <Form onSubmit={(e) => handleSignUp(e)}>

                        <h5 style={{ textAlign: 'center' }}>{'<DGB/>'}</h5>
                        {err ?
                            <div className='errorHandler' id='err'>
                                <Errormsg err={err}/>
                            </div>
                            :
                            <></>
                        }

                        <Label size='sm'>Correo</Label>
                        <div className="email">
                            <input required type='email' value={user.email} name='email' onChange={(e) => setUser({ ...user, email: e.target.value })} ></input>
                        </div>
                        <Label size='sm'>Contraseña</Label>
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
                        <Label size='sm'> Repetir Contraseña</Label>
                        <div className="password">
                            <input required type='password' name='password2' onChange={(e) => passCheck(e.target.value)} ></input>
                            <div className="eye" onClick={() => setPassView(!passView)}>
                                {passView ?
                                    <FaEyeSlash />
                                    :
                                    <FaEye />
                                }
                            </div>
                        </div>

                        {check ?
                            <p style={{ color: 'green', fontSize: 'x-small' }}>'Correcto'</p>
                            :
                            <p style={{ color: 'red', fontSize: 'x-small' }}>'La contraseña no coincide'</p>
                        }

                        <Button size='sm' id='btnSU' color='primary' type='submit' block>Registrar</Button>
                        <div className='form-login-footer'>
                            <Link to={'/login'}>{'< Login'}</Link>
                        </div>
                    </Form>

                </div>
            </div>

        </div>
    )
}

export default Signup