import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Label, Spinner } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { async } from '@firebase/util'
import Errormsg from '../components/Errormsg'


const Resetpwd = () => {
    const [user, setUser] = useState({
        email: '',
    })
    const [sending, setSending]= useState(false)
    const [err,setErr] = useState(null)

    const changePass = async (e) => {
        e.preventDefault()
        setSending(false)
       await sendPasswordResetEmail(auth, user.email)
        .then((res)=>{
            console.log(res)
            setSending(false)
        })
        .catch((err)=>{
            setErr(err.code)
            setSending(false)
            setTimeout(()=>{
            setErr(null)
            },2000)
        })
    }


    return (
        <div>
            <div>
                <div className='form-login'>
                    {sending?
                    
                    <Spinner size={'lg'}/>
                    :
                    <Form onSubmit={(e) => changePass(e)}>
                        <h5 style={{ textAlign: 'center' }}>{'<DGB/>'}</h5>
                       {err?
                       <>
                        <Errormsg err={err}/>    
                       </>
                        :
                        <></>    
                        }

                        <Label>Correo</Label>
                        <div className="email">
                            <input
                                required
                                type='email'
                                value={user.email}
                                name='email'
                                onChange={(e) => setUser({ ...user, email: e.target.value })}>
                            </input>
                        </div>

                        <br></br>
                        <Button color='primary' type='submit' block >Resetear contraseña</Button>

                        <div className='form-login-footer'>
                            <Link to={'/login'}>Iniciar sesión</Link>
                            <Link to={'/signup'}>Registrate</Link>
                        </div>
                    </Form>
                    }
                </div>
            </div>

        </div>

    )
}

export default Resetpwd