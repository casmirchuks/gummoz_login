import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Colors } from '../colors'
type CustomButtomProps = {
  onPress?: any,
  text: string,
  type?: string,
  bgColor?: string,
  fgColor?: string
}

const CustomButtom:FunctionComponent<CustomButtomProps> = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
  return (
    <Pressable onPress={onPress} 
      style={[
        styles.container, 
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {}

      ]}>
      <Text 
        style={[
          styles.text, 
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {}
        ]}>
        {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,

  },

  container_PRIMARY: {
    backgroundColor: Colors.primary,

  },
  container_SECONDARY: {
    backgroundColor: Colors.graylight,
    borderWidth: 2,

  },
  container_TERTIARY: {
    backgroundColor: Colors.graydark,

  },
  text: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 15,
  }, 
  text_SECONDARY: {
    color: Colors.graydark
  },

})
export default CustomButtom