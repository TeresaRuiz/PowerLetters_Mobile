// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
// Importa la función useFocusEffect de @react-navigation/native, 
// que permite ejecutar un efecto cada vez que la pantalla se enfoca.

import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CarritoCard/CarritoCard';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Carrito = ({ navigation }) => {
  // Estado para almacenar los detalles del carrito
  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  // Estado para el id del detalle seleccionado para modificar
  const [idDetalle, setIdDetalle] = useState(null);
  // Estado para la cantidad del producto seleccionado en el carrito
  const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
  // Estado para controlar la visibilidad del modal de edición de cantidad
  const [modalVisible, setModalVisible] = useState(false);
  // IP del servidor
  const ip = Constantes.IP;

  // Función para navegar hacia atrás a la pantalla de productos
  const backProducts = () => {
    navigation.navigate('Productos');
  };

  // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      getDetalleCarrito(); // Llama a la función getDetalleCarrito.
    }, [])
  );

  // Función para obtener los detalles del carrito desde el servidor
  const getDetalleCarrito = async () => {
    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=readDetail`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data, "Data desde getDetalleCarrito")
      if (data.status) {
        setDataDetalleCarrito(data.dataset);
      } else {
        console.log("No hay detalles del carrito disponibles")
        //Alert.alert('ADVERTENCIA', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  };

  // Función para finalizar el pedido
  const finalizarPedido = async () => {
    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=finishOrder`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert("Se finalizó la compra correctamente")
        // Guardar el pedido en el historial
        guardarPedidoEnHistorial(); // Implementar esta función
        setDataDetalleCarrito([]); // Limpiar la lista de detalles del carrito
        navigation.navigate('TabNavigator', { screen: 'Productos' });
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
    }
  };

  const guardarPedidoEnHistorial = async () => {
    try {
      const historialPedidos = await AsyncStorage.getItem('historialPedidos');
      let historial = historialPedidos ? JSON.parse(historialPedidos) : [];

      // Verificar y formatear datos antes de guardarlos
      const nuevoPedido = dataDetalleCarrito.map(detalle => ({
        id: detalle.id_detalle,
        nombreProducto: detalle.nombre_producto,
        cantidad: detalle.cantidad_producto || 0, // Asegurarse de que cantidad esté presente
        precio: detalle.precio_producto || 0 // Asegurarse de que precio esté presente
      }));

      historial.push(nuevoPedido); // Agregar el carrito actual al historial
      await AsyncStorage.setItem('historialPedidos', JSON.stringify(historial));
      console.log('Historial guardado correctamente:', historial);
    } catch (error) {
      console.error('Error al guardar en el historial de pedidos:', error);
    }
  };


  // Función para manejar la modificación de un detalle del carrito
  const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
    setModalVisible(true);
    setIdDetalle(idDetalle);
    setCantidadProductoCarrito(cantidadDetalle);
  };

  // Función para renderizar cada elemento del carrito
  const renderItem = ({ item }) => (
    <CarritoCard
      item={item}
      cargarCategorias={getDetalleCarrito}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      setCantidadProductoCarrito={setCantidadProductoCarrito}
      cantidadProductoCarrito={cantidadProductoCarrito}
      idDetalle={idDetalle}
      setIdDetalle={setIdDetalle}
      accionBotonDetalle={handleEditarDetalle}
      getDetalleCarrito={getDetalleCarrito}
      updateDataDetalleCarrito={setDataDetalleCarrito} // Nueva prop para actualizar la lista
    />
  );

  return (
    <View style={styles.container}>
      {/* Componente de modal para editar cantidad */}
      <ModalEditarCantidad
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        idDetalle={idDetalle}
        setIdDetalle={setIdDetalle}
        setCantidadProductoCarrito={setCantidadProductoCarrito}
        cantidadProductoCarrito={cantidadProductoCarrito}
        getDetalleCarrito={getDetalleCarrito}
      />

      {/* Título de la pantalla */}
      <Text style={styles.title}>Carrito de compras</Text>

      {/* Lista de detalles del carrito */}
      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_detalle.toString()}
        />
      ) : (
        <Text style={styles.titleDetalle}>No hay detalles del carrito disponibles.</Text>
      )}

      {/* Botones de finalizar pedido y regresar a productos */}
      <View style={styles.containerButtons}>
        {dataDetalleCarrito.length > 0 && (
          <Buttons
            textoBoton='Finalizar pedido'
            accionBoton={finalizarPedido}
            color='#4CAF50'
          />
        )}
        <Buttons
          textoBoton='Regresar a libros'
          accionBoton={backProducts}
          color='#5064d4'
        />
      </View>
    </View>
  );
};

export default Carrito;

// Estilos
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
  titleDetalle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
