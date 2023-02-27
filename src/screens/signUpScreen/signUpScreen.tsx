import React, { useState} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';

import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtom from '../../components/SocialSignInButtom';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type SignInScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};


const SignUpScreen = ({ navigation }: SignInScreenNavigationProps) => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordRepeat, setPasswordRepeat ] = useState('')


  const dispatch = useAppDispatch()

  const onRegisterPressed = () => {
    console.log('Register Pressed');
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
          placeholer='Username' 
          value={username}
          setValue={setUsername}
        />
        <CustomInput 
          placeholer='Email' 
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholer='Password' 
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomInput
          placeholer='Repeat Password' 
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />
        <CustomButtom 
          onPress={onRegisterPressed} 
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