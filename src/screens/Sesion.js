import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/Inputs/Input'
import InputEmail from '../components/Inputs/InputEmail'
import Buttons from '../components/Buttons/Button';
import SocialButton from '../components/Buttons/SocialButton';
import CardButton from '../components/HomeCards/CardButton';
import * as Constantes from '../utils/constantes'
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {
  const ip = Constantes.IP;

  const [isContra, setIsContra] = useState(true)
  const [usuario, setUsuario] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  //Función para cerrar la sesión
  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Sesion');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };
  // Efecto para validar la sesión al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      validarSesion(); // Llama a la función validarSesion.
    }, [])
  );

  const validarSesion = async () => {
    try {
      // Hace una petición para validar si hay una sesión activa
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=getUser`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status === 1) {
        navigation.navigate('TabNavigator'); // Si hay una sesión activa, navega a la pantalla principal
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
      // Hace una petición para cerrar la sesión
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=logOut`, {
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
    // Valida que se hayan ingresado el correo y la contraseña
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
      return;
    }

    try {
      // Crea un FormData con los datos de inicio de sesión
      const formData = new FormData();
      formData.append('correo_usuario', usuario);
      formData.append('clave_usuario', contrasenia);
      // Hace una petición para iniciar sesión
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        // Si el inicio de sesión es exitoso, limpia los campos y navega a la pantalla principal
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
    // Navega a la pantalla de registro
    navigation.navigate('SignUp');
  };
  const Recuperar = async () => {
    // Navega a la pantalla de registro
    navigation.navigate('Recuperacion');
  };


  useEffect(() => { validarSesion() }, [])

  return (
    <View style={styles.container}>
       {/* Muestra el logo de la aplicación */}
      <Image source={require('../img/logo_blanco.png')} style={styles.image} />
      <Text style={styles.title}>¡Hola de nuevo!</Text>
      <Text style={styles.subtitle}>Bienvenido a Power Letters</Text>
      {/* Campo de correo electrónico */}
      <InputEmail
        placeHolder='Ingresa tu correo electrónico'
        setValor={usuario}
        setTextChange={setUsuario}
      />
       {/* Campo de contraseña */}
      <Input
        placeHolder='Ingresa tu contraseña'
        setValor={contrasenia}
        setTextChange={setContrasenia}
        contra={isContra}
      />
      {/* Enlace para recuperar la contraseña */}
      <TouchableOpacity onPress={Recuperar}>
      <Text style={styles.recoveryText}>Recuerda tu contraseña</Text>
      </TouchableOpacity>
      <Buttons
        textoBoton='Iniciar sesión'
        accionBoton={handlerLogin}
        color='#FF6F61'
      />
      <CardButton iconName="log-out-outline" label="Cerrar sesión" onPress={handleLogout} color="#fff" />
      {/* Texto separador para las opciones de inicio de sesión con redes sociales */}
      <Text style={styles.orText}>― O continua con ―</Text>
      {/* Contenedor para los botones de redes sociales */}
      <View style={styles.socialContainer}>
        <SocialButton name="google" size={30} color="#DB4437" />
        <SocialButton name="apple" size={30} color="#000000" />
        <SocialButton name="facebook" size={30} color="#3B5998" />
      </View>
      {/* Enlace para navegar a la pantalla de registro */}
      <TouchableOpacity onPress={irRegistrar}>
        <Text style={styles.signUpText}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
      
    </View>
  );
}
// Estilos del componente
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
