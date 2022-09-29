import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const userdataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    load: (state,payload) => {
      state.value = payload.payload     
    },
       
  },
})


// Action creators are generated for each case reducer function
export const { load } = userdataSlice.actions

export default userdataSlice.reducer