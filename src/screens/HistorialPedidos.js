import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para almacenamiento local

const HistorialPedidos = () => {
  const [historialPedidos, setHistorialPedidos] = useState([]);

  useEffect(() => {
    obtenerHistorialPedidos();
  }, []);

  const obtenerHistorialPedidos = async () => {
    try {
      // Obtener el historial de pedidos desde AsyncStorage
      const historial = await AsyncStorage.getItem('historialPedidos');
      if (historial !== null) {
        setHistorialPedidos(JSON.parse(historial));
      }
    } catch (error) {
      console.error('Error al obtener el historial de pedidos:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Pedido ID: {item.id_pedido}</Text>
      <Text style={styles.itemText}>Total: ${item.total}</Text>
      {/* Agrega más detalles del pedido según tus necesidades */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Pedidos</Text>
      <FlatList
        data={historialPedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_pedido.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No hay pedidos en el historial.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HistorialPedidos;
