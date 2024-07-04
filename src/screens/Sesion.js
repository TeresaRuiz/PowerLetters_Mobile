import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import InputField from '../components/Inputs/InputField.js';
import SocialButton from '../components/Buttons/SocialButton.js';
import * as Constantes from '../utils/constantes'
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {
  const ip = Constantes.IP;

  const [isContra, setIsContra] = useState(true)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      validarSesion(); // Llama a la función getDetalleCarrito.
    }, [])
  );

  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_Mobile/api/services/public/usuario.php?action=getUser`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status === 1) {
        navigation.navigate('TabNavigator');
        console.log("Se ingresa con la sesión activa")
      } else {
        console.log("No hay sesión activa")
        return
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  }

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_Mobile/api/services/public/usuario.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada")
      } else {
        console.log('No se pudo eliminar la sesión')
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
    }
  }

  const handlerLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('correo', usuario);
      formData.append('clave', contrasenia);

      const response = await fetch(`${ip}/PowerLetters_Mobile/api/services/public/usuario.php.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        setContrasenia('')
        setUsuario('')
        navigation.navigate('TabNavigator');
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const irRegistrar = async () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => { validarSesion() }, [])

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
