import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';

const Sesion = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Again!</Text>
      <Text style={styles.subtitle}>Welcome back you've been missed!</Text>
      <Input placeholder="Enter username" />
      <Input placeholder="Password" secureTextEntry />
      <Button title="Sign In" onPress={() => { /* Add your sign-in logic here */ }} />
      <Button title="Register" style={styles.registerButton} onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: 'gray',
  },
});

export default Sesion;
