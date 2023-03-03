import React from 'react'
import { View, Text } from 'react-native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Auth } from 'aws-amplify';

// Component
import CustomButtom from '../../components/CustomButtom'

// Types
import { RootStackParamList } from '../../types';

type ScreenNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home = ({ navigation }: ScreenNavigationProps) => {

  const onSignOutPressed = async () => {
    await Auth.signOut();
    // navigation.navigate('SignIn');
  }
  
  return (
    <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>Gummoz Spare Parts</Text>
      <CustomButtom 
        text='Sign Out' onPress={onSignOutPressed}    
      />
    </View>
  )
}

export default Home