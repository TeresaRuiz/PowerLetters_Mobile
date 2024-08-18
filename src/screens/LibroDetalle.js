import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import * as Constantes from '../utils/constantes';

export default function DetalleLibro({ route, navigation }) {
  const { id_libro } = route.params;
  const [libro, setLibro] = useState(null);
  const ip = Constantes.IP;

  const getLibroDetails = async () => {
    try {
      const formData = new FormData();
      formData.append('idLibro', id_libro);

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/libros.php?action=readOne`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setLibro(data.dataset);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los detalles del libro');
    }
  };

  useEffect(() => {
    getLibroDetails();
  }, []);

  if (!libro) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando detalles del libro...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>{libro.titulo_libro}</Text>
        <Image
          source={{ uri: `${ip}/PowerLetters_TeresaVersion/api/images/libros/${libro.imagen}` }}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>
            <Text style={styles.label}>Autor:</Text> {libro.nombre_autor}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Precio:</Text> ${libro.precio}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Descripción:</Text> {libro.descripcion_libro}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Clasificación:</Text> {libro.nombre_clasificacion}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Editorial:</Text> {libro.nombre_editorial}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Existencias:</Text> {libro.existencias}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Género:</Text> {libro.nombre_genero}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 500,
    borderRadius: 15,
    marginBottom: 20,
    borderColor: '#5C3D2E',
    borderWidth: 2,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C3D2E',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#5C3D2E',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    color: '#5C3D2E',
  },
});