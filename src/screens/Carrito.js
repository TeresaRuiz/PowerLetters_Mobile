import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CarritoCard/CarritoCard';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';

// Importa la imagen
import emptyCartImage from '../img/carrito.png';

const Carrito = ({ navigation }) => {
   // Estado para almacenar los detalles de los productos en el carrito
  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  // Estado para almacenar el ID del detalle del producto seleccionado
  const [idDetalle, setIdDetalle] = useState(null);
  // Estado para almacenar la cantidad de libros en el carrito
  const [cantidadLibroCarrito, setCantidadLibroCarrito] = useState(0);
  // Estado para controlar la visibilidad del modal para editar cantidades
  const [modalVisible, setModalVisible] = useState(false);
  const ip = Constantes.IP;
// Función para navegar a la pantalla de productos
  const backProducts = () => {
    navigation.navigate('Productos');
  };
// Efecto que se ejecuta cuando el componente gana el enfoque
  useFocusEffect(
    React.useCallback(() => {
      // Llamada a la función para obtener los detalles del carrito
      getDetalleCarrito();
    }, [])
  );
  // Función para obtener los detalles del carrito desde la API
  const getDetalleCarrito = async () => {
    try {
       // Realiza una solicitud GET a la API para obtener los detalles del carrito
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=readDetail`, {
        method: 'GET',
      });
      // Convierte la respuesta en formato JSON
      const data = await response.json();
      // Verifica si la respuesta contiene un estado exitoso
      if (data.status) {
        // Actualiza el estado con los detalles del carrito obtenidos
        setDataDetalleCarrito(data.dataset);
      } else {
        // Si no hay detalles disponibles, se muestra un mensaje en la consola
        console.log("No hay detalles del carrito disponibles");
      }
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error(error, "Error desde Catch");
       // Muestra una alerta al usuario en caso de error
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  };
// Función para finalizar el pedido
const finalizarPedido = async () => {
  try {
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/pedido.php?action=finishOrder`, {
          method: 'GET',
      });
      const data = await response.json();

      if (data.status) {
          Alert.alert("Se finalizó la compra correctamente");
          setDataDetalleCarrito([]); // Limpia la lista de detalles del carrito

          // Navega al historial de pedidos con un parámetro
      } else {
          Alert.alert('Error', data.error);
      }
  } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
  }
};
// Función para manejar la edición de un detalle del carrito
  const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
    // Muestra el modal para editar la cantidad del producto
    setModalVisible(true);
    // Establece el ID del detalle que se va a editar
    setIdDetalle(idDetalle);
    // Establece la cantidad del producto que se va a editar
    setCantidadLibroCarrito(cantidadDetalle);
  };
// Función para renderizar cada elemento del carrito
  const renderItem = ({ item }) => (
    <CarritoCard
      item={item}
      cargarCategorias={getDetalleCarrito}// Prop para cargar las categorías (no se usa en este código)
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      setCantidadLibroCarrito={setCantidadLibroCarrito}
      cantidadLibroCarrito={cantidadLibroCarrito}
      idDetalle={idDetalle}
      setIdDetalle={setIdDetalle}
      accionBotonDetalle={handleEditarDetalle} // Prop para manejar la acción del botón de detalle
      getDetalleCarrito={getDetalleCarrito}
      updateDataDetalleCarrito={setDataDetalleCarrito} // Prop para actualizar la lista de detalles del carrito
    />
  );
// Renderizado del componente principal
  return (
    <View style={styles.container}>
     {/* Modal para editar la cantidad de un producto */}
      <ModalEditarCantidad
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        idDetalle={idDetalle}
        setIdDetalle={setIdDetalle}
        setCantidadLibroCarrito={setCantidadLibroCarrito}
        cantidadLibroCarrito={cantidadLibroCarrito}
        getDetalleCarrito={getDetalleCarrito}
      />
 {/* Título del carrito de compras */}
      <Text style={styles.title}>Carrito de compras</Text>
{/* Renderiza la lista de detalles del carrito */}
      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_detalle.toString()}
        />
      ) : (
        // Muestra un mensaje cuando el carrito está vacío
        <View style={styles.emptyContainer}>
          <Image source={emptyCartImage} style={styles.emptyImage} />
          <Text style={styles.titleDetalle}>No hay detalles del carrito disponibles.</Text>
        </View>
      )}
 {/* Botones para finalizar el pedido y regresar a libros */}
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
//Estilo de la pantalla
export default Carrito;

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
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});
