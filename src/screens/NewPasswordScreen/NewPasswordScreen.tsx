import React, { useState} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useAppDispatch } from '../../appRedux/hook';
import { Colors } from '../../components/colors';

import CustomButtom from '../../components/CustomButtom';
import CustomInput from '../../components/CustomInput';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewPassword'>;
};

const NewPasswordScreen = ({ navigation }: ScreenNavigationProps) => {
  const [ code, setCode ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')

  const dispatch = useAppDispatch()

  const onSubmitPressed = () => {
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
          placeholer='Code' 
          value={code}
          setValue={setCode}
        />
        <CustomInput 
          placeholer='Enter your new password' 
          value={newPassword}
          setValue={setNewPassword}
        />
        
        <CustomButtom 
          onPress={onSubmitPressed} 
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