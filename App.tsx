import { StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import { Colors } from './src/components/colors';
import { Provider } from 'react-redux'
import { store } from './src/appRedux/store';

import SignInScreen from './src/screens/signInScreen';
import SignUpScreen from './src/screens/signUpScreen';
import ConfirmEmailScrenn from './src/screens/confirmEmailScrenn';

export default function App() {
 
  return (
    <>
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
          {/* <SignInScreen/> */}
          {/* <SignUpScreen/> */}
          <ConfirmEmailScrenn />
      </SafeAreaView>
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.graylight,
    justifyContent: 'center',
  },
});
