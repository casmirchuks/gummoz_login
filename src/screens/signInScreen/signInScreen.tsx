import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, Alert} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm, SubmitHandler } from 'react-hook-form'

import { Colors } from '../../components/colors';
import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import Logo from './../../../assets/images/gummozIcon.png'
import SocialSignInButtom from '../../components/SocialSignInButtom';
import { RootStackParamList } from '../../types';
import { signIn } from '../../appRedux/authSlice';
import { Auth } from 'aws-amplify'

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
};

interface IFormInput {
  username: string;
  password: string;
}

const SignInScreen = ({ navigation }: ScreenNavigationProps) => {
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSiginPressed: SubmitHandler<IFormInput> =  async (data) => {
    const {username , password} = data
    if(loading){
      return;
    }

    setLoading(true)
    dispatch(signIn(data))    
    try {
      await Auth.signIn(username, password)
      navigation.navigate('Home');       
    } catch (error: any) {
      Alert.alert('Oops', error.message)
    }
    setLoading(false);
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  }
  
  const onForgotPasswordPressed = () => {
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
          name="username"
          placeholer='Username' 
          control={control}
          rules={{required: 'Username is required'}}
        />
        <CustomInput
          name="password"
          placeholer='Password' 
          control={control}
          rules={{
            required: 'Password is required', 
            minLength: {
              value: 8, 
              message: 'Password should be 8 character long'
            },
          }}
          secureTextEntry
        />

        <CustomButtom onPress={handleSubmit(onSiginPressed)} 
          text={loading ? 'Loading..' :  'Sign In' }
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