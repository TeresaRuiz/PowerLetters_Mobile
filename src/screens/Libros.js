import { StatusBar, StyleSheet, Text, View, FlatList, SafeAreaView, Alert, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'; 
import LibroCard from '../components/Libros/LibroCard';  
import ModalCompra from '../components/Modales/ModalCompra'; 
import Constants from 'expo-constants'; 

export default function Libros({ navigation }) {
  // IP de la API
  const ip = Constantes.IP;
  // Estados para manejar la lista de libros y el modal de compra
  const [dataLibros, setDataLibros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idLibroModal, setIdLibroModal] = useState('');
  const [nombreLibroModal, setNombreLibroModal] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda

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
      if (data.status) {
        setDataLibros(data.dataset);
      } else {
        Alert.alert('Error libros', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al listar los libros');
    }
  };
// useEffect para obtener la lista de libros al montar el componente
  useEffect(() => {
    getLibros();
  }, []);

  // Filtra los libros según el texto de búsqueda
  const filteredLibros = dataLibros.filter(libro =>
    libro.titulo_libro.toLowerCase().includes(searchText.toLowerCase())
  );
// Renderizado del componente principal
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Libros nuevos</Text>
      
      {/* Campo de entrada para el buscador */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar libros..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ModalCompra
        visible={modalVisible}  // Controla la visibilidad del modal
        cerrarModal={setModalVisible}
        nombreLibroModal={nombreLibroModal}
        idLibroModal={idLibroModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />
      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={filteredLibros} // Utiliza la lista filtrada
          keyExtractor={(item) => item.id_libro.toString()}
          renderItem={({ item }) => (
            <LibroCard
              ip={ip}
              imagenLibro={item.imagen}
              idLibro={item.id_libro}
              tituloLibro={item.titulo_libro}
              descripcionLibro={item.descripcion_libro}
              precioLibro={item.precio}
              navigation={navigation}
              accionBotonLibro={() => handleCompra(item.titulo_libro, item.id_libro)}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}
//Estilo del componente
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '90%', // Ajusta el ancho según sea necesario
  },
});