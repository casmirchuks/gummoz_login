import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Colors } from '../colors'
import {  Controller } from 'react-hook-form'


interface CustomInputProps {
  placeholer?: string
  secureTextEntry?: boolean
  control: any
  name: any
  rules: {}
}

const CustomInput:FunctionComponent<CustomInputProps> = ({control, rules={}, name, placeholer, secureTextEntry}) => {
  return (
      <Controller
        name={name} 
        control={control}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
          <View style={[Styles.Container, {borderColor: error ? Colors.primary : Colors.graydark}]}>
            <TextInput 
              value={value}
              onChangeText={onChange} 
              onBlur={onBlur} 
              placeholder={placeholer}
              style={[Styles.Input, {}]}
              secureTextEntry={secureTextEntry}
            /> 
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
          </>
        )}
      />
  )
};

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 15,

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