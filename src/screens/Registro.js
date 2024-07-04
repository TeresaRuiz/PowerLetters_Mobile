import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import SocialButton from '../components/SocialButton';

const Registro = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo_blanco.png')} style={styles.image} />
      <Text style={styles.title}>¡Regístrate!</Text>
      <Text style={styles.subtitle}>Crea tu cuenta en Power Letters</Text>
      <InputField
        placeholder="Ingresa tu usuario"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InputField
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        placeholder="Confirma tu contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signUpButton} onPress={() => { /* Your sign up logic here */ }}>
        <Text style={styles.signUpButtonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>― O regístrate con ―</Text>
      <View style={styles.socialContainer}>
        <SocialButton name="google" size={30} color="#DB4437" />
        <SocialButton name="apple" size={30} color="#000000" />
        <SocialButton name="facebook" size={30} color="#3B5998" />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Sesion')}>
        <Text style={styles.signInText}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0ecfc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 25,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
  },
  signUpButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: '#000000',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  signInText: {
    color: '#000000',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});

export default Registro;
