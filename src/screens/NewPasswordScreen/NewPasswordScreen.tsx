import React from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';
import { useForm, SubmitHandler } from 'react-hook-form'

import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewPassword'>;
};

interface IFormInput {
  code: string;
  newPassword: string
}

const NewPasswordScreen = ({ navigation }: ScreenNavigationProps) => {
  const dispatch = useAppDispatch()

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      code: '',
      newPassword: ''
    }
  });

  const onSubmitPressed: SubmitHandler<IFormInput> = () => {
    console.log('Submit Pressed');
    navigation.navigate('Home')
  }
  const onSignInPressed = () => {
    console.log('Confirmed Pressed');
    navigation.navigate('SignIn')
  }



  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
        <CustomInput 
          name='code'
          placeholer='Code' 
          control={control} 
          rules={{required: 'Code is required'}}      
        />
        <CustomInput 
          name='new password'
          placeholer='Enter your new password' 
          control={control} 
          rules={{
            required: 'Enter new password',
            minLength: {
              value: 8, 
              message: 'Password should be 8 character long'
            },
          }}       
        />
        
        <CustomButtom 
          onPress={handleSubmit(onSubmitPressed)} 
          text='Submit' 
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
export default NewPasswordScreen