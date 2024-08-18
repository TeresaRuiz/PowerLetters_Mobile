import { StatusBar, StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes';
import LibroCard from '../components/Libros/LibroCard'; // Cambia la importación
import ModalCompra from '../components/Modales/ModalCompra';
import Constants from 'expo-constants';

export default function Libros({ navigation }) {
  const ip = Constantes.IP;
  const [dataLibros, setDataLibros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idLibroModal, setIdLibroModal] = useState('');
  const [nombreLibroModal, setNombreLibroModal] = useState('');

  const handleCompra = (nombre, id) => {
    setModalVisible(true);
    setIdLibroModal(id);
    setNombreLibroModal(nombre);
  };

  const getLibros = async () => {
    try {
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

  useEffect(() => {
    getLibros();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Libros nuevos</Text>

      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreLibroModal}
        idProductoModal={idLibroModal}
      />
      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={dataLibros}
          keyExtractor={(item) => item.id_libro} // Ajusta el identificador de libro
          renderItem={({ item }) => (
            <LibroCard
              ip={ip}
              imagenLibro={item.imagen} // Cambia el nombre a imagenLibro
              idLibro={item.id_libro} // Cambia el nombre a idLibro
              tituloLibro={item.titulo_libro} // Cambia el nombre a tituloLibro
              descripcionLibro={item.descripcion_libro} // Cambia el nombre a descripcionLibro
              precioLibro={item.precio} // Cambia el nombre a precioLibro
              accionBotonLibro={() => handleCompra(item.titulo_libro, item.id_libro)}
            />
          )}
        />
      </SafeAreaView>
      <Text style={styles.title}></Text>
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
});
