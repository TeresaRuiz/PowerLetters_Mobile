import React from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';

export default function InputEmail({ placeholder, setValor, setTextChange }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={setValor}
      placeholderTextColor={'#A1A1A1'}
      onChangeText={setTextChange}
      keyboardType="email-address"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
