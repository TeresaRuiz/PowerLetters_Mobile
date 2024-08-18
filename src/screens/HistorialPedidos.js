import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as Constantes from '../utils/constantes';

export default function HistorialPedidos({ navigation }) {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const ip = Constantes.IP;

  const getHistorial = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=readHistorial`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setHistorial(data.dataset);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el historial de pedidos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistorial();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5C3D2E" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Historial de pedidos</Text>
      {historial.length === 0 ? (
        <Text style={styles.subtitle}>No hay pedidos para mostrar</Text>
      ) : (
        historial.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: `${ip}/PowerLetters_TeresaVersion/api/images/libros/${item.imagen}` }}
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
