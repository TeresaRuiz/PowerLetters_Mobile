import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';
import { MaterialIcons, Entypo } from 'react-native-vector-icons'; // Importa iconos

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
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              const formData = new FormData();
              formData.append('idDetalle', idDetalle);
              const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=deleteDetail`, {
                method: 'POST',
                body: formData,
              });
              const data = await response.json();
              if (data.status) {
                Alert.alert('Datos eliminados correctamente del carrito');
                updateDataDetalleCarrito((prevData) => prevData.filter((item) => item.id_detalle !== idDetalle));
              } else {
                Alert.alert('Error al eliminar del carrito', data.error);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error al eliminar del carrito');
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>ID: {item.id_detalle}</Text>
        <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
        <Text style={styles.itemText}>Precio: ${item.precio}</Text>
        <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.itemText}>SubTotal: ${(parseFloat(item.cantidad) * parseFloat(item.precio)).toFixed(2)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.modifyButton}
            onPress={() => accionBotonDetalle(item.id_detalle, item.cantidad)}>
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}
            onPress={() => handleDeleteDetalleCarrito(item.id_detalle)}>
            <Entypo name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {item.imagen && (
        <Image
          source={{ uri: `${ip}/PowerLetters_TeresaVersion/api/images/libros/${item.imagen}` }}
          style={styles.itemImage}
        />
      )}
    </View>
  );
};

export default CarritoCard;

const styles = StyleSheet.create({
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
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space between text and image
  },
  textContainer: {
    flex: 1, // Allow the text container to take up available space
    marginRight: 16, // Space between text and image
  },
  itemImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space between buttons
    marginTop: 8, // Space above buttons
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: '#8F6B58',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#8F6B58',
    marginRight: 8, // Space between modify and delete buttons
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#D2691E',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#D2691E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});