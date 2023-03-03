import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth, forgotPasswordType, signInType, signUpType } from '../types'

const initialStateValue: auth = {
  signIn: {
    username: '',
    password: ''
  },
  signUp: {
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  },
  forgotPassword: {
    username: ''
  }
}


export const authSlice= createSlice({
  name: 'auth',
  initialState: {value: initialStateValue},
  reducers: {
    signIn: (state, action: PayloadAction<signInType>) => {
      state.value.signIn = action.payload
    },
    signUp: (state, action: PayloadAction<signUpType>) => {
      state.value.signUp = action.payload
    },
    forgotPassword: (state, action: PayloadAction<forgotPasswordType>) => {
      state.value.forgotPassword = action.payload
    },
  }
});

export const { signIn, signUp, forgotPassword } = authSlice.actions

export default authSlice.reducer

