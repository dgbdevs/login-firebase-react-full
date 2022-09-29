import React from 'react'
import { useSelector, useDispatch } from 'react-redux'



const Avatar = () => {
    const user = useSelector((state) => state.user.value)

    return (
        <div className='avatar'>
            {user?
            <>
            {user.photoURL ?
                <img src={user.photoURL} referrerPolicy="no-referrer">
                </img>
                :
                <>
                    {user.fullname ?
                        <>{user.fullname.slice(0,1).toUpperCase()}</>
                        :
                        <>{user.email.slice(0,1).toUpperCase()}</>
                    }
                </>
            }
            </>
            :
            <>
            TEST
            </>
            }
            


        </div>
    )
}

export default Avatar