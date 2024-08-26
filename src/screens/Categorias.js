import { StatusBar, StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'; // Importa constantes para la configuración
import LibroCard from '../components/Libros/LibroCard'; // Componente para mostrar información de un libro
import ModalCompra from '../components/Modales/ModalCompra'; // Modal para realizar la compra
import RNPickerSelect from 'react-native-picker-select'; // Componente para seleccionar categorías
import { Ionicons } from '@expo/vector-icons'; // Iconos de Ionicons
import Constants from 'expo-constants'; // Constantes de Expo
import { FontAwesome } from '@expo/vector-icons'; // Iconos de FontAwesome

export default function Libros({ navigation }) {
   // IP de la API
  const ip = Constantes.IP;
  // Estado para almacenar la lista de libros
  const [dataLibros, setDataLibros] = useState([]);
  // Estado para almacenar la lista de categorías
  const [dataCategorias, setDataCategorias] = useState([]);
  // Estado para almacenar el valor seleccionado en el picker
  const [selectedValue, setSelectedValue] = useState(null);
   // Estado para almacenar la cantidad de libros a comprar
  const [cantidad, setCantidad] = useState('');
  // Estado para controlar la visibilidad del modal de compra
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para almacenar el ID del libro en el modal
  const [idLibroModal, setIdLibroModal] = useState('');
  // Estado para almacenar el nombre del libro en el modal
  const [nombreLibroModal, setNombreLibroModal] = useState('');

// Función para navegar de vuelta a la pantalla de inicio
  const volverInicio = () => {
    navigation.navigate('Home');
  };
// Función para manejar la acción de compra
  const handleCompra = (nombre, id) => {
     // Muestra el modal de compra y establece el libro seleccionado
    setModalVisible(true);
    setIdLibroModal(id);
    setNombreLibroModal(nombre);
  };
// Función para obtener libros según la categoría seleccionada
  const getLibros = async (idCategoriaSelect = 1) => {
    try {
      // Función para obtener libros según la categoría seleccionada
      if (idCategoriaSelect <= 0) return;
       // Se crea un objeto FormData para enviar los datos de la categoría
      const formData = new FormData();
      formData.append('idGenero', idCategoriaSelect);
 // Se realiza una solicitud POST a la API para obtener los libros de la categoría seleccionada
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/libros.php?action=readLibrosGeneros`, {
        method: 'POST',
        body: formData,
      });
      // Se convierte la respuesta en formato JSON
      const data = await response.json();
      // Verifica si la respuesta es exitosa
      if (data.status) {
        // Actualiza el estado con los libros obtenidos
        setDataLibros(data.dataset);
      } else {
        // Muestra un mensaje de error si no se pueden obtener los libros
        Alert.alert('Error libros', data.error);
      }
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      Alert.alert('Error', 'Ocurrió un error al listar los libros');
    }
  };
// Función para obtener todas las categorías disponibles
  const getCategorias = async () => {
    try {
      // Se realiza una solicitud GET a la API para obtener las categorías
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/genero.php?action=readAllGenero`, {
        method: 'GET',
      });
      // Se convierte la respuesta en formato JSON
      const data = await response.json();
      // Verifica si la respuesta es exitosa
      if (data.status) {
        // Actualiza el estado con las categorías obtenidas
        setDataCategorias(data.dataset);
      } else {
        // Muestra un mensaje de error si no se pueden obtener las categorías
        Alert.alert('Error categorías', data.error);
      }
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      Alert.alert('Error', 'Ocurrió un error al listar los géneros');
    }
  };
// Función para manejar el cambio de categoría en el selector
  const handleCategoriaChange = (itemValue) => {
    setSelectedValue(itemValue);// Actualiza el valor seleccionado
    getLibros(itemValue);  // Llama a getLibros cuando cambia la categoría
  };
// useEffect para cargar libros y categorías al montar el componente
  useEffect(() => {
    getLibros(); // Llama a getLibros con la categoría por defecto
    getCategorias(); // Llama a getCategorias para cargar las categorías
  }, []);
// Función para navegar al carrito
  const irCarrito = () => {
    navigation.navigate('Carrito');
  };
// Renderizado del componente principal
  return (
    <View style={styles.container}>
      {/* Botón para regresar a la pantalla anterior */}
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      {/* Título del catálogo de libros */}
      <Text style={styles.title}>Catálogo de libros</Text>
      {/* Modal de compra */}
      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreLibroModal={nombreLibroModal}
        idLibroModal={idLibroModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />
      {/* Selector de categorías */}
      <View>
        <Text style={styles.subtitle}>
          Selecciona un género para filtrar los libros
        </Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ inputAndroid: styles.picker }}
            onValueChange={(value) => handleCategoriaChange(value)}
            // Maneja el cambio de categoría
            placeholder={{ label: 'Selecciona un genéro...', value: null }}
            items={dataCategorias.map(categoria => ({
              label: categoria.nombre_genero,
              value: categoria.id_genero,
            }))}
          />
        </View>
      </View>
      {/* Lista de libros */}
      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={dataLibros}
          keyExtractor={(item) => item.id_libro}
          renderItem={({ item }) => (
            <LibroCard 
              ip={ip}
              imagenLibro={item.imagen}
              idLibro={item.id_libro}
              tituloLibro={item.titulo_libro}
              descripcionLibro={item.descripcion_libro}
              precioLibro={item.precio}
              existenciasProducto={item.existencias}
              navigation={navigation}  // Cambio en el nombre de la propiedad
              accionBotonLibro={() => handleCompra(item.titulo_libro, item.id_libro)}// Maneja la acción de compra
            />
          )}
        />
      </SafeAreaView>
 {/* Botón para ir al carrito */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={irCarrito}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.cartButtonText}>Ir al carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
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
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5064d4',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
    marginHorizontal: 5,
    color: '#5C3D2E', 
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#5064d4', 
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#5064d4',
  },
  picker: {
    color: '#FFFFFF',
  },
});