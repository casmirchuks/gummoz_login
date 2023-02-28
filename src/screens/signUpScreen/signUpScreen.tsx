import React from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';
import { useForm, SubmitHandler } from 'react-hook-form'


import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtom from '../../components/SocialSignInButtom';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signUp } from '../../appRedux/authSlice';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

type SignInScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

interface IFormInput {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const SignUpScreen = ({ navigation }: SignInScreenNavigationProps) => {
  const dispatch = useAppDispatch()

  const {control, handleSubmit, formState: {errors}, watch} = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
    }
  });

  const pwd = watch('password')
  const onRegisterPressed: SubmitHandler<IFormInput> = (data) => {
    console.log('Register Pressed');
    dispatch(signUp(data))
    navigation.navigate('ConfirmEmail')
  }

  const onSignInPressed = () => {
    console.log('SignIn Pressed');
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create account</Text>
        <CustomInput 
          name='usernmae'
          placeholer='Username'
          control={control}  
          rules={{required: 'Username is required'}}      
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
          text='Register' 
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