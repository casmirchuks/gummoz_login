import React, { FunctionComponent, useState} from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from '../../components/colors';
import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import Logo from './../../../assets/images/gummozIcon.png'
import SocialSignInButtom from '../../components/SocialSignInButtom';
import { RootStackParamList } from '../../types';

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
};


const SignInScreen = ({ navigation }: ScreenNavigationProps) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const {height} = useWindowDimensions();

  // const dispatch = useAppDispatch()

  const onSiginPressed = () => {
    console.log('signin Pressed');
    // validate user
    navigation.navigate('Home')
  }
  const onSignUpPressed = () => {
    console.log('signup Pressed');
    navigation.navigate('SignUp');
  }
  
  const onForgotPasswordPressed = () => {
    console.log('forgot password Pressed');
    navigation.navigate('ForgotPassword');
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.3}]} 
          resizeMode="contain" 
        />
        <CustomInput 
          placeholer='Username' 
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
        />
        <CustomInput
          placeholer='Password' 
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomButtom 
          onPress={onSiginPressed} 
          text='Sign In' 
        />
        <CustomButtom 
          onPress={onForgotPasswordPressed} 
          text='Forgot Password?'
          type='SECONDARY'
        />
        <SocialSignInButtom />
        <CustomButtom 
          onPress={onSignUpPressed} 
          text="Don't have an account? Create one"
          type='TERTIARY'
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.graylight,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  }
})

export default SignInScreen