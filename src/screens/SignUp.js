import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Button title="Register" onPress={() => { /* Add your register logic here */ }} />
      <Button title="Back to Login" style={styles.backButton} onPress={() => navigation.navigate('Sesion')} />
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
  backButton: {
    marginTop: 10,
    backgroundColor: 'gray',
  },
});

export default SignUp;
