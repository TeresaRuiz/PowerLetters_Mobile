import React, { useState } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';

export default function InputEmail({ placeholder }) {
  const [valor, setValor] = useState('');

  return (
    <TextInput
      style={styles.input}
      placeholder="Correo electrónico"
      value={valor}
      placeholderTextColor={'#A1A1A1'}
      onChangeText={(text) => setValor(text)}
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
