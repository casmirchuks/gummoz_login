import React, { useState} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';

import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ConfirmEmail'>;
};

const ComfirmEmailScreen = ({ navigation }: ScreenNavigationProps) => {
  const [ code, setCode ] = useState('')

  const dispatch = useAppDispatch()

  const onConfirmPressed = () => {
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
          placeholer='Enter confirmation code' 
          value={code}
          setValue={setCode}
        />
        <CustomButtom 
          onPress={onConfirmPressed} 
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