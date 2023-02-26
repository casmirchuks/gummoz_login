import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Colors } from '../colors'

interface CustomInputProps {
  value: string,
  setValue: any
  placeholer: string
  secureTextEntry?: boolean
}

const CustomInput:FunctionComponent<CustomInputProps> = ({value, setValue, placeholer, secureTextEntry}) => {
  return (
    <View style={Styles.Container}>
      <TextInput 
        value={value}
        onChangeText={setValue}
        placeholder={placeholer}
        style={Styles.Input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
};

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 15,

    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 20,
    marginVertical: 5,
  },
  Input: {
    fontWeight: 'bold',
    fontSize: 15,
  }
});


export default CustomInput