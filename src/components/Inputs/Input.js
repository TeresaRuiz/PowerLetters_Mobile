import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, secureTextEntry, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Input;
