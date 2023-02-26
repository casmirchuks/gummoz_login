import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signInType } from '../types'

const initialStateValue: signInType = {
  username: '',
  password: ''
}

export const authSlice = createSlice({
  name: 'signin',
  initialState: {value: initialStateValue},
  reducers: {
    signin: (state, action: PayloadAction<signInType>) => {
      state.value = action.payload
    }
  }
});

export const { signin } = authSlice.actions

export default authSlice.reducer

