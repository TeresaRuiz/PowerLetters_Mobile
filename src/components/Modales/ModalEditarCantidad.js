import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';

const ModalEditarCantidad = ({ setModalVisible, modalVisible, idDetalle, cantidadLibroCarrito, getDetalleCarrito }) => {
  const [inputCantidad, setInputCantidad] = useState(''); // Estado local para el input

  const ip = Constantes.IP;

  useEffect(() => {
    if (modalVisible) {
      setInputCantidad(''); // Limpiar el campo de entrada cuando el modal se abre
    }
  }, [modalVisible]);

  const handleUpdateDetalleCarrito = async () => {
    const cantidadNumero = parseInt(inputCantidad, 10);

    if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
      Alert.alert("La cantidad no puede ser igual o menor a 0");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('idDetalle', idDetalle);
      formData.append('cantidadLibro', cantidadNumero.toString());

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Se actualizó el detalle del producto');
        getDetalleCarrito();
      } else {
        Alert.alert('Error al editar detalle carrito', data.error);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error en editar carrito", error.message);
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
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Cantidad actual: {cantidadLibroCarrito}</Text>
          <Text style={styles.modalText}>Nueva cantidad:</Text>
          <TextInput
            style={styles.input}
            value={inputCantidad}
            onChangeText={setInputCantidad}
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
});

export default ModalEditarCantidad;
