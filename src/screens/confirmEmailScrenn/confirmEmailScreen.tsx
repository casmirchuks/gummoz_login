import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';
import { useForm, SubmitHandler } from 'react-hook-form'
import { RouteProp, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify'

import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ConfirmEmail'>;
};

interface IFormInput {
  code: string;
  username: string
}

const ComfirmEmailScreen = ({ navigation }: ScreenNavigationProps) => {
  const route = useRoute<RouteProp<RootStackParamList, 'ConfirmEmail'>>()
  const dispatch = useAppDispatch()

  const {control, handleSubmit, watch} = useForm({
    defaultValues: {
      username: route?.params?.username,
      code: '',
    }
  });

  const username = watch('username');

  const onConfirmPressed: SubmitHandler<IFormInput> = async (data) => {
    const { username, code } = data

    try {
      await Auth.confirmSignUp(username, code)
      navigation.navigate('SignIn');
    } catch (error: any) {
      Alert.alert('Oops', error.message)
    }
  }

  const onBackToSignInPressed = () => {
    navigation.navigate('SignIn')
  }

  const onResendPressed = async () => {
    try {
      await Auth.resendSignUp(username)
      Alert.alert('Success' ,'Code has been resent to your email')
    } catch (error: any) {
      Alert.alert('Oops', error.message)
    }
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput 
          name="username"
          placeholer='Username' 
          control={control} 
          rules={{required: 'Username is required'}}  
        />
        <CustomInput 
          name="code"
          placeholer='Enter confirmation code' 
          control={control} 
          rules={{required: 'Confirmation code is required'}}  
        />

        <CustomButtom 
          onPress={handleSubmit(onConfirmPressed)} 
          text='Confirm' 
        />
        <CustomButtom 
          onPress={handleSubmit(onResendPressed)} 
          text="Resend Code"
          type='SECONDARY'
        />
        <CustomButtom 
          onPress={onBackToSignInPressed} 
          text="Back to Sign In"
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
export default ComfirmEmailScreen