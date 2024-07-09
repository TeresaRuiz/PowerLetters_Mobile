import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import CardButton from '../components/HomeCards/CardButton';
import * as Constantes from '../utils/constantes';

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState(null);
  const [loading, setLoading] = useState(true);
  const ip = Constantes.IP;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/cliente.php?action=logOut`, {
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

  const irActualizar = () => {
    navigation.navigate('Productos');
  };

  const EditUser = () => {
    navigation.navigate('UpdateUser');
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.name.nombre_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener la información del usuario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5C3D2E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../img/inicio.png')} style={styles.image} />
      <Text style={styles.title}>¡Bienvenido/a a Power Letters!</Text>
      <Text style={styles.subtitle}>{nombre ? nombre : 'No hay Nombre para mostrar'}</Text>
      <View style={styles.cardsContainer}>
        <CardButton iconName="log-out-outline" label="Cerrar sesión" onPress={handleLogout} color="#fff" />
        <CardButton iconName="book-outline" label="Libros" onPress={irActualizar} color="#fff" />
        <CardButton iconName="person-outline" label="Perfil" onPress={EditUser} color="#fff" />
      </View>
    </View>
  );
}

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
