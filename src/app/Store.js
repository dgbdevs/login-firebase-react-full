import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/user/userSlice'
import userdataReducer from '../features/user/userdataSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    userdata:userdataReducer,
  },
})