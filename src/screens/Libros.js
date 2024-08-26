import { StatusBar, StyleSheet, Text, View, FlatList, SafeAreaView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'; // Importa constantes para la configuración de la API
import LibroCard from '../components/Libros/LibroCard';  // Componente para mostrar información de un libro
import ModalCompra from '../components/Modales/ModalCompra'; // Modal para realizar la compra
import Constants from 'expo-constants'; // Importa constantes de Expo

export default function Libros({ navigation }) {
  // IP de la API
  const ip = Constantes.IP;
   // Estados para manejar la lista de libros y el modal de compra
  const [dataLibros, setDataLibros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idLibroModal, setIdLibroModal] = useState('');
  const [nombreLibroModal, setNombreLibroModal] = useState('');
  const [cantidad, setCantidad] = useState(''); // Estado para la cantidad
// Función para manejar la acción de compra
  const handleCompra = (nombre, id) => {
    setModalVisible(true); // Muestra el modal de compra
    setIdLibroModal(id); // Establece el ID del libro en el modal
    setNombreLibroModal(nombre); // Establece el nombre del libro en el modal
  };
  // Función para obtener la lista de libros desde la API
  const getLibros = async () => {
    try {
        // Realiza una solicitud GET a la API para obtener todos los libros
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/libros.php?action=readAll`, {
        method: 'GET',
      });
      const data = await response.json();
      // Verifica si la respuesta es exitosa
      if (data.status) {
        setDataLibros(data.dataset); // Actualiza el estado con la lista de libros
      } else {
        Alert.alert('Error libros', data.error);  // Muestra un mensaje de error si no se pueden obtener los libros
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al listar los libros'); // Maneja cualquier error durante la solicitud
    }
  };
// useEffect para obtener la lista de libros al montar el componente
  useEffect(() => {
    getLibros();
  }, []);
// Renderizado del componente principal
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Libros nuevos</Text>
 {/* Modal para realizar la compra */}
      <ModalCompra
        visible={modalVisible}  // Controla la visibilidad del modal
        cerrarModal={setModalVisible} // Función para cerrar el modal
        nombreLibroModal={nombreLibroModal} // Nombre del libro en el modal
        idLibroModal={idLibroModal} // ID del libro en el modal
        cantidad={cantidad}  // Cantidad de libros a comprar
        setCantidad={setCantidad} // Función para actualizar la cantidad
      />
      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={dataLibros} // Lista de libros
          keyExtractor={(item) => item.id_libro.toString()} // Clave única para cada libro
          renderItem={({ item }) => (
            <LibroCard
              ip={ip}
              imagenLibro={item.imagen} // Imagen del libro
              idLibro={item.id_libro} // ID del libro
              tituloLibro={item.titulo_libro}  // Título del libro
              descripcionLibro={item.descripcion_libro}// Descripción del libro
              precioLibro={item.precio} // Precio del libro
              navigation={navigation} // Pasa la navegación al componente LibroCard
              accionBotonLibro={() => handleCompra(item.titulo_libro, item.id_libro)}
              // Maneja la acción de compra
            />
          )}
        />

      </SafeAreaView>
      <Text style={styles.title}></Text>
    </View>
  );
}
// Estilos del componente
const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
});
