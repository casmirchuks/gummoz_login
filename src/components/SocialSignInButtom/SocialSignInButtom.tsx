import { View, Text } from 'react-native'
import React from 'react'
import CustomButtom from '../CustomButtom'

const SocialSignInButtom = () => {

  const signInFacebook = () => {
    console.log('facebook');
    
  }
  const signInGoogle = () => {
    console.log('google');
    
  }
  const signInApple = () => {
    console.log('apple');
    
  }

  return (
    <>
    <CustomButtom 
          onPress={signInFacebook} 
          text='Sign In With Facebook'
          type='facebook'
          bgColor= '#E7EAFA'
          fgColor= '#4765A9'
        />
        <CustomButtom 
          onPress={signInGoogle} 
          text='Sign in with Google'
          type='google'
          bgColor= '#FAE9EA'
          fgColor= '#DD4D44'
        />
        <CustomButtom 
          onPress={signInApple} 
          text='Sign in with Apple'
          type='apple'
          bgColor= '#e3e3e3'
          fgColor= '#363636'
        />
    </>
  )
}

export default SocialSignInButtom