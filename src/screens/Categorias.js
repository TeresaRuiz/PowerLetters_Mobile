import { StatusBar, StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes';
import LibroCard from '../components/Libros/LibroCard';
import ModalCompra from '../components/Modales/ModalCompra';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';

export default function Libros({ navigation }) {
  const ip = Constantes.IP;
  const [dataLibros, setDataLibros] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [idLibroModal, setIdLibroModal] = useState('');
  const [nombreLibroModal, setNombreLibroModal] = useState('');

  const volverInicio = () => {
    navigation.navigate('Home');
  };

  const handleCompra = (nombre, id) => {
    setModalVisible(true);
    setIdLibroModal(id);
    setNombreLibroModal(nombre);
  };

  const getLibros = async (idCategoriaSelect = 1) => {
    try {
      if (idCategoriaSelect <= 0) return;

      const formData = new FormData();
      formData.append('idGenero', idCategoriaSelect);

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/libros.php?action=readLibrosGeneros`, {
        method: 'POST',
        body: formData,
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

  const getCategorias = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/genero.php?action=readAllGenero`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.status) {
        setDataCategorias(data.dataset);
      } else {
        Alert.alert('Error categorías', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al listar los géneros');
    }
  };

  const handleCategoriaChange = (itemValue) => {
    setSelectedValue(itemValue);
    getLibros(itemValue);  // Llama a getLibros cuando cambia la categoría
  };

  useEffect(() => {
    getLibros();
    getCategorias();
  }, []);

  const irCarrito = () => {
    navigation.navigate('Carrito');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de libros</Text>
      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreLibroModal={nombreLibroModal}
        idLibroModal={idLibroModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />
      <View>
        <Text style={styles.subtitle}>
          Selecciona un género para filtrar los libros
        </Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ inputAndroid: styles.picker }}
            onValueChange={(value) => handleCategoriaChange(value)}
            placeholder={{ label: 'Selecciona un genéro...', value: null }}
            items={dataCategorias.map(categoria => ({
              label: categoria.nombre_genero,
              value: categoria.id_genero,
            }))}
          />
        </View>
      </View>
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
              existenciasProducto={item.existencias} // Cambio en el nombre de la propiedad
              accionBotonLibro={() => handleCompra(item.titulo_libro, item.id_libro)}
            />
          )}
        />
      </SafeAreaView>

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