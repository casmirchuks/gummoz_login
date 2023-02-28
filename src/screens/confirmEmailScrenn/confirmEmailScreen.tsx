import React from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';
import { useForm, SubmitHandler } from 'react-hook-form'


import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ConfirmEmail'>;
};

interface IFormInput {
  code: string;
}

const ComfirmEmailScreen = ({ navigation }: ScreenNavigationProps) => {
  const dispatch = useAppDispatch()

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      code: '',
    }
  });

  const onConfirmPressed: SubmitHandler<IFormInput> = () => {
    console.log('Confirmed Pressed');
    navigation.navigate('Home');
  }
  const onSignInPressed = () => {
    console.log('Confirmed Pressed');
    navigation.navigate('SignIn')
  }
  const onResendPressed = () => {
    console.log('Confirmed Pressed');
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput 
          name="code"
          placeholer='Enter confirmation code' 
          control={control} 
          rules={{required: 'Enter confirmation code'}}  
        />
        <CustomButtom 
          onPress={handleSubmit(onConfirmPressed)} 
          text='Confirm' 
        />
        <CustomButtom 
          onPress={onResendPressed} 
          text="Resend Code"
          type='SECONDARY'
        />
        <CustomButtom 
          onPress={onSignInPressed} 
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