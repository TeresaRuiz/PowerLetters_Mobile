import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import CardButton from '../components/HomeCards/CardButton'; // Componente para los botones de la interfaz
import * as Constantes from '../utils/constantes'; // Importa constantes para la configuración de la API
import { useFocusEffect } from '@react-navigation/native'; // Hook para manejar el enfoque de la pantalla

export default function Home({ navigation, route }) {
  // Estado para almacenar el nombre del usuario
  const [nombre, setNombre] = useState(null);
  // Estado para controlar el indicador de carga
  const [loading, setLoading] = useState(true);
  // IP de la API
  const ip = Constantes.IP;
  //Función para cerrar la sesión
  const handleLogout = async () => {
    try {
      // Realiza una solicitud GET para cerrar la sesión
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      // Verifica si la respuesta es exitosa
      if (data.status) {
        navigation.navigate('Sesion'); // Navega a la pantalla de sesión
      } else {
        Alert.alert('Error', data.error); // Muestra un mensaje de error
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
      // Maneja errores
    }
  };
  //Función para ir a la pantalla de productos
  const irActualizar = () => {
    navigation.navigate('Productos'); // Navega a la pantalla de productos
  };
  //función para ir a la pantalla de actualizar
  const EditUser = () => {
    navigation.navigate('UpdateUser'); // Navega a la pantalla de actualización de usuario
  };
 // Función para obtener la información del usuario
  const getUser = async () => {
    try {
      // Realiza una solicitud GET para obtener la información del usuario
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      // Verifica si la respuesta es exitosa
      if (data.status) {
        setNombre(data.name.nombre_usuario); // Establece el nombre del usuario
      } else {
        Alert.alert('Error', data.error); // Muestra un mensaje de error
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener la información del usuario'); // Maneja errores
    } finally {
      setLoading(false); // Finaliza el indicador de carga
    }
  };
  // useFocusEffect para actualizar la información del usuario cuando la pantalla se enfoca
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updated) {
        getUser(); // Llama a getUser si se ha actualizado la información
      }
    }, [route.params?.updated])
  );
// useEffect para obtener la información del usuario al montar el componente
  useEffect(() => {
    getUser(); // Llama a getUser para cargar la información del usuario
  }, []);
// Si está cargando, muestra un indicador de carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5C3D2E" />
      </View>
    );
  }
   // Renderizado del componente principal
  return (
    <View style={styles.container}>
      <Image source={require('../img/inicio.png')} style={styles.image} />
      {/* Imagen de bienvenida */}
      <Text style={styles.title}>¡Bienvenido/a a Power Letters!</Text>
      <Text style={styles.subtitle}>{nombre ? nombre : 'No hay nombre para mostrar'}</Text>
      {/* Muestra el nombre del usuario o un mensaje por defecto */}
      <View style={styles.cardsContainer}>
        {/* Botones para navegar a diferentes pantallas */}
        <CardButton iconName="person-outline" label="Perfil" onPress={EditUser} color="#fff" />
        <CardButton iconName="book-outline" label="Catálogo" onPress={irActualizar} color="#fff" />
        <CardButton iconName="log-out-outline" label="Cerrar sesión" onPress={handleLogout} color="#fff" />
      </View>
    </View>
  );
}
//Estilo del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#5C3D2E',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5C3D2E',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
