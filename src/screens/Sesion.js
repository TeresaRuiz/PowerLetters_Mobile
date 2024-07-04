import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos FontAwesome

const Sesion = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo_blanco.png')} style={styles.image} />
      <Text style={styles.title}>¡Hola de nuevo!</Text>
      <Text style={styles.subtitle}>Bienvenido a Power Letters</Text>
      <TextInput
        placeholder="Ingresa tu usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={[styles.input, styles.passwordInput]}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#A1A1A1" />
        </TouchableOpacity>
      </View>
      <Text style={styles.recoveryText}>Recuerda tu contraseña</Text>
      <TouchableOpacity style={styles.signInButton} onPress={() => { /* Your sign in logic here */ }}>
        <Text style={styles.signInButtonText}>Inicio de sesión</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>― O continua con ―</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={30} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="apple" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="facebook" size={30} color="#3B5998" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>¿No tienes una cuenta? Registrate</Text>
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
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%', // Centra verticalmente la imagen
    right: 20,
    transform: [{ translateY: -18 }] // Ajusta la posición vertical
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
  socialButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f0ecfc',
    marginHorizontal: 10,
    borderWidth: 1, // Establece el ancho del borde
    borderColor: 'white', // Establece el color del borde
  },
  signUpText: {
    color: '#000000',
  },
  image: {
    width: 120, // Ajusta el ancho según tus necesidades
    height: 120, // Ajusta la altura según tus necesidades
    marginBottom: 20, // Agrega un margen inferior para separar la imagen del título
  }  
});

export default Sesion;
