import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';

const ModalCompra = ({ visible, cerrarModal, nombreLibroModal, idLibroModal, cantidad, setCantidad }) => {
  const ip = Constantes.IP;

  // Resetear cantidad cuando el modal se abre
  useEffect(() => {
    if (visible) {
      setCantidad(''); // Limpiar el campo de cantidad
    }
  }, [visible]);

  const handleCreateDetail = async () => {
    const cantidadNumero = parseInt(cantidad, 10);

    if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
      Alert.alert("Debes ingresar una cantidad válida, no puede ser un número negativo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('idLibro', idLibroModal);
      formData.append('cantidadLibro', cantidadNumero.toString());

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=createDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Datos guardados correctamente');
        cerrarModal(false);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al crear detalle');
    }
  };

  const handleCancelCarrito = () => {
    cerrarModal(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        cerrarModal(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{nombreLibroModal}</Text>
          <Text style={styles.modalText}>Cantidad:</Text>
          <TextInput  
            style={styles.input}
            value={cantidad}
            onChangeText={text => setCantidad(text)}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          <Buttons
            textoBoton='Agregar al carrito'
            accionBoton={handleCreateDetail}
            color='#5064d4'
            estilo={{ paddingVertical: 15, paddingHorizontal: 30 }} // Ajusta el tamaño del botón
          />
          <Buttons
            textoBoton='Cancelar'
            accionBoton={handleCancelCarrito}
            color='#5064d4'
            estilo={{ paddingVertical: 15, paddingHorizontal: 30 }} // Ajusta el tamaño del botón
          />
        </View>
      </View>
    </Modal>
  );
};

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
    textAlign: 'center',
  },
});

export default ModalCompra;
