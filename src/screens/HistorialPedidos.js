import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import * as Constantes from '../utils/constantes';

export default function HistorialPedidos({ navigation }) {
  // Estado para almacenar el historial de pedidos
  const [historial, setHistorial] = useState([]);
  // Estado para controlar el indicador de carga
  const [loading, setLoading] = useState(true);
  // Estado para controlar el refresco
  const [refreshing, setRefreshing] = useState(false);
  
  // IP de la API
  const ip = Constantes.IP;

  // Función para obtener el historial de pedidos
  const getHistorial = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=readHistorial`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setHistorial(data.dataset); // Actualiza el estado con el historial de pedidos
      } else {
        Alert.alert('Error', data.error); // Muestra mensaje de error si no se puede obtener el historial
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el historial de pedidos'); // Manejo de errores
    } finally {
      setLoading(false); // Finaliza el indicador de carga
      setRefreshing(false); // Finaliza el refresco
    }
  };

  // useEffect para obtener el historial de pedidos al montar el componente
  useEffect(() => {
    getHistorial();
  }, []);

  // Función para manejar el refresco
  const onRefresh = () => {
    setRefreshing(true); // Inicia el refresco
    getHistorial(); // Llama a getHistorial para actualizar el historial
  };

  // Si está cargando y no hay refresco, muestra un indicador de carga
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5C3D2E" />
      </View>
    );
  }

  // Renderizado del componente
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Agrega el control de refresco
      }
    >
      <Text style={styles.title}>Historial de pedidos</Text>
      {/* Si no hay pedidos, muestra un mensaje */}
      {historial.length === 0 ? (
        <Text style={styles.subtitle}>No hay pedidos para mostrar</Text>
      ) : (
        // Mapea el historial y muestra cada pedido
        historial.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: `${ip}/PowerLetters_TeresaVersion/api/images/libros/${item.imagen}` }} // Muestra la imagen del libro
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Fecha: {item.fecha_pedido}</Text>
              <Text style={styles.itemText}>Dirección: {item.direccion_pedido}</Text>
              <Text style={styles.itemText}>Estado: {item.estado}</Text>
              <Text style={styles.itemText}>Libro: {item.nombre_libro}</Text>
              <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.itemText}>Precio: ${item.precio}</Text>
              <Text style={styles.itemText}>Subtotal: ${item.subtotal}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0ecfc',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5C3D2E',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5C3D2E',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});