import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';

const ModalEditarCantidad = ({setModalVisible, modalVisible, idDetalle, setCantidadLibroCarrito, cantidadLibroCarrito, getDetalleCarrito}) => {

  const ip = Constantes.IP;

  const handleUpdateDetalleCarrito = async () => {
    try {
      if (cantidadLibroCarrito <= 0) {
        Alert.alert("La cantidad no puede ser igual o menor a 0");
        return; // Corrige la lógica aquí
      }

      const formData = new FormData();
      formData.append('idDetalle', idDetalle);
      formData.append('cantidadLibro', cantidadLibroCarrito);

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Se actualizo el detalle del producto');
        getDetalleCarrito();
      } else {
        Alert.alert('Error al editar detalle carrito', data.error);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error en editar carrito", error);
      setModalVisible(false);
    }
  };

  const handleCancelEditarCarrito = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>Cantidad actual: {cantidadLibroCarrito}</Text>
          <Text style={styles.modalText}>Nueva cantidad:</Text>
          <TextInput
            style={styles.input}
            value={cantidadLibroCarrito}
            onChangeText={setCantidadLibroCarrito}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          <Buttons
            textoBoton='Editar cantidad'
            accionBoton={handleUpdateDetalleCarrito}
            color='#5064d4'
            estilo={{ paddingVertical: 15, paddingHorizontal: 30 }}
          />
          <Buttons
            textoBoton='Cancelar'
            accionBoton={handleCancelEditarCarrito}
            color='#5064d4'
            estilo={{ paddingVertical: 15, paddingHorizontal: 30 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditarCantidad;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 300,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
