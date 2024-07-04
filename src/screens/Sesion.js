import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import SocialButton from '../components/SocialButton';

const Sesion = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo_blanco.png')} style={styles.image} />
      <Text style={styles.title}>¡Hola de nuevo!</Text>
      <Text style={styles.subtitle}>Bienvenido a Power Letters</Text>
      <InputField
        placeholder="Ingresa tu usuario"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.recoveryText}>Recuerda tu contraseña</Text>
      <TouchableOpacity style={styles.signInButton} onPress={() => { /* Your sign in logic here */ }}>
        <Text style={styles.signInButtonText}>Inicio de sesión</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>― O continua con ―</Text>
      <View style={styles.socialContainer}>
        <SocialButton name="google" size={30} color="#DB4437" />
        <SocialButton name="apple" size={30} color="#000000" />
        <SocialButton name="facebook" size={30} color="#3B5998" />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.signUpText}>¿No tienes una cuenta? Regístrate</Text>
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
  recoveryText: {
    alignSelf: 'flex-end',
    color: '#000000',
    marginBottom: 20,
  },
  signInButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
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
  signUpText: {
    color: '#000000',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});

export default Sesion;
