import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalado

export default function Input({ placeHolder, setValor, contra, setTextChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.Input}
        placeholder={placeHolder}
        value={setValor}
        placeholderTextColor={'gray'}
        secureTextEntry={contra && !isPasswordVisible}
        onChangeText={setTextChange}
      />
      {contra && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  Input: {
    backgroundColor: '#FFFFFF',
    color: "#000000",
    width: "100%",
    height: Platform.OS === 'ios' ? 50 : 50, // Estilo de la barra de pestañas, altura diferente para iOS y Android
    borderRadius: 5,
    padding: 5,
    marginVertical: 10
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: Platform.OS === 'ios' ? 20 : 20,
  },
});
