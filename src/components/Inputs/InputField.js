import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
        style={styles.input}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#A1A1A1" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
  },
});

export default InputField;
