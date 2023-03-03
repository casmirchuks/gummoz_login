import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';
import { useForm, SubmitHandler } from 'react-hook-form'


import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtom from '../../components/SocialSignInButtom';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signUp } from '../../appRedux/authSlice';
import { Auth } from 'aws-amplify'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

type SignInScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

interface IFormInput {
  name: string,
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const SignUpScreen = ({ navigation }: SignInScreenNavigationProps) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading ] = useState(false)

  const {control, handleSubmit, formState: {errors}, watch} = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
    }
  });

  const pwd = watch('password')

  const onRegisterPressed: SubmitHandler<IFormInput> = async (data) => {
    const {username, name, email, password} = data
    if(loading){
      return;
    }

    setLoading(true);
    dispatch(signUp(data))
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username}
      })
      navigation.navigate('ConfirmEmail', {username});
    } catch (error: any) {
      Alert.alert('Oops', error.message)
    }
    setLoading(false);
  }

  const onSignInPressed = () => {
    console.log('SignIn Pressed');
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput 
          name='name'
          placeholer='Full Name'
          control={control}  
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long'
            },
            maxLength: {
              value: 24,
              message: 'Username should be at max 24 characters long'
            },
          }}      
        />
        <CustomInput 
          name='usernmae'
          placeholer='Username'
          control={control}  
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long'
            },
            maxLength: {
              value: 24,
              message: 'Username should be at max 24 characters long'
            },
          }}      
        />
        <CustomInput 
          name='email'
          placeholer='Email' 
          control={control}  
          rules={{
            required: 'Email is required', 
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'
          }}}  
        />
        <CustomInput
          name='password'
          placeholer='Password' 
          control={control}  
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8, 
              message: 'Password should be 8 character long'
            }
          }}  
          secureTextEntry
        />
        <CustomInput
          name='passwordRepeat'
          placeholer='Repeat Password' 
          control={control}  
          rules={{
            required: 'Please re-enter your password',
            validate: (value: string) => value === pwd || "Password does not match",
            minLength: {
              value: 8, 
              message: 'Password should be 8 character long'
            }
          }}  
          secureTextEntry
        />
        <CustomButtom 
          onPress={handleSubmit(onRegisterPressed)} 
          text={loading ? 'Loading... ' : 'Register' }
        />

        <Text style={styles.text}>By registering, you confirm to our {''}
          <Text style={styles.link}>Terms and Use</Text> of {''}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>

        <SocialSignInButtom />

        <CustomButtom 
          onPress={onSignInPressed} 
          text="Have an account? Sign In"
          type='SECONDARY'
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
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 10,
  },
  text: {
    color: Colors.graydark,
    marginVertical: 10
  },
  link: {
    color: Colors.accent1
  }
})
export default SignUpScreen