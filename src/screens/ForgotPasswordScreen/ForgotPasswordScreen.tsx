import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';
import { useForm, SubmitHandler } from 'react-hook-form'


import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { forgotPassword } from '../../appRedux/authSlice';
import { Auth } from 'aws-amplify';

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

interface IFormInput {
  username: string;
}

const ForgotPasswordScreen = ({ navigation }: ScreenNavigationProps) => {
  const dispatch = useAppDispatch()

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
    }
  });

  const onSendPressed: SubmitHandler<IFormInput> = async (data) => {
    dispatch(forgotPassword(data))
    try {
      await Auth.forgotPassword(data.username)
      navigation.navigate('NewPassword')
    } catch (error: any) {
      Alert.alert('Oops', error.message)
    }
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Enter your username</Text>
        <CustomInput 
          name="username"
          placeholer='Username' 
          control={control} 
          rules={{required: 'Username is required'}}          
        />
        
        <CustomButtom 
          onPress={handleSubmit(onSendPressed)} 
          text='Send' 
        />

        <CustomButtom 
          onPress={onSignInPressed} 
          text="Back to Sign In"
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
export default ForgotPasswordScreen