import React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import { Colors } from './src/components/colors';
import { Provider } from 'react-redux'
import { store } from './src/appRedux/store';
import Navigation from './src/navigation';

export default function App() {
 
  return (
      <Provider store={store}>
        <SafeAreaView style={styles.root}>
            <Navigation />
        </SafeAreaView>
      </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.graylight,
    justifyContent: 'center',
  },
});
