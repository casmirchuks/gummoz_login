import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth, Hub } from 'aws-amplify'; 

// Screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScrenn from '../screens/ConfirmEmailScrenn';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen'

// Types
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();


const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUserAuth = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (error) {
      setUser(undefined);
    }
  };

  useEffect(() => {
    checkUserAuth()
  }, [])

  useEffect(() => {
    const listener = (data: any) => {
      if (data.payload.event === 'signIn' || data.payload.event === "signOut") {
        checkUserAuth();
      }
    }

    Hub.listen('auth', listener );
    return Hub.listen('auth', listener)
  }, [])

  if(user === undefined){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? ( <Stack.Screen name="Home" component={HomeScreen} />) 
          : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScrenn} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation