import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';

const CarritoCard = ({ item, updateDataDetalleCarrito, accionBotonDetalle }) => {

  const ip = Constantes.IP;

  const handleDeleteDetalleCarrito = async (idDetalle) => {
    try {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar este elemento del carrito?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              const formData = new FormData();
              formData.append('idDetalle', idDetalle);
              const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=deleteDetail`, {
                method: 'POST',
                body: formData
              });
              const data = await response.json();
              if (data.status) {
                Alert.alert('Datos eliminados correctamente del carrito');
                updateDataDetalleCarrito(prevData => prevData.filter(item => item.id_detalle !== idDetalle));
              } else {
                Alert.alert('Error al eliminar del carrito', data.error);
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error al eliminar del carrito");
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.id_detalle}</Text>
      <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio_producto}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad_producto}</Text>
      <Text style={styles.itemText}>SubTotal: ${(parseFloat(item.cantidad_producto) * parseFloat(item.precio_producto)).toFixed(2)}</Text>

      <TouchableOpacity style={styles.modifyButton}
        onPress={() => accionBotonDetalle(item.id_detalle, item.cantidad_producto)}>
        <Text style={styles.buttonText}>Modificar cantidad</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton}
        onPress={() => handleDeleteDetalleCarrito(item.id_detalle)}>
        <Text style={styles.buttonText}>Eliminar del carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarritoCard;

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
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: '#8F6B58',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#8F6B58',
    marginVertical: 4,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#D2691E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#D2691E',
    marginVertical: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
