import React, { useState, useEffect } from 'react'

const Errormsg = ({ err }) => {

    const [error, setError] = useState(null)

    const handleError = () => {
        if (err) {
            switch (err) {
                case 'auth/wrong-password':
                    return (setError('Contraseña incorrecta'),
                        setTimeout(() => {
                            setError(null)
                        }, 2000))
                    break;

                case 'auth/user-not-found':
                    return (setError('Usuario inexistente'),
                        setTimeout(() => {
                            setError(null)
                        }, 2000))
                    break;
                case 'auth/too-many-requests':
                    return (setError('Demasiados intentos fallidos, aguarde unos minutos o recupere su contraseña'),
                        setTimeout(() => {
                            setError(null)
                        }, 4000))
                    break;
                case 'auth/email-already-in-use':
                    return (setError('El usuario ya existe'),
                        setTimeout(() => {
                            setError(null)
                        }, 2000))
                    break;

                case 'auth/weak-password':
                    return (setError('Contraseña demasiado debil - Utilize al menos 6 caracteres'),
                        setTimeout(() => {
                            setError(null)
                        }, 2000))
                    break;
                case 'auth/invalid-email':
                    return (setError('Verifique su correo'),
                        setTimeout(() => {
                            setError(null)
                        }, 4000))
                    break;
                default:
                    return (setError('ERROR'),
                        setTimeout(() => {
                            setError(null)
                        }, 4000))
                    break;
                    
            }
        }
    }


    useEffect(() => {
        console.log(err)
        handleError()
    }, [])

    return (
        <div>
            <div className='errorHandler' id='err'>
                {error}
            </div>

        </div>
    )
}

export default Errormsg