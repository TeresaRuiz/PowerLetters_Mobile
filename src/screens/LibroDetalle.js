import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TextInput, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes';

export default function DetalleLibro({ route }) {
  const { id_libro, tituloLibro, descripcionLibro, precioLibro, imagenLibro } = route.params;
  const [libro, setLibro] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevaCalificacion, setNuevaCalificacion] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const ip = Constantes.IP;

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const getLibroDetails = async () => {
    try {
      const formData = new FormData();
      formData.append('idLibro', id_libro);

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/libros.php?action=readOne`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setLibro(data.dataset);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los detalles del libro');
    }
  };

  const getComentarios = async () => {
    try {
      const formData = new FormData();
      formData.append('id_libro', id_libro);

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/comentarios.php?action=readOneComment`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setComentarios(data.dataset);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los comentarios');
    }
  };

  const enviarComentario = async () => {
    try {
      const formData = new FormData();
      formData.append('id_libro', id_libro);
      formData.append('comentario', nuevoComentario);
      formData.append('calificacion', nuevaCalificacion.toString());

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/comentarios.php?action=createRow`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert('Éxito', 'Comentario añadido correctamente');
        setNuevoComentario('');
        setNuevaCalificacion(5);
        getComentarios(); // Actualizar la lista de comentarios
      } else {
        Alert.alert('Error', data.error || 'No se pudo añadir el comentario');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al enviar el comentario');
    }
  };

  useEffect(() => {
    getLibroDetails();
    getComentarios();
  }, []);

  const handleImagePress = () => {
    setSelectedImage(`${ip}/PowerLetters_TeresaVersion/api/images/libros/${imagenLibro}`);
    setModalVisible(true);
  };

  const ComentarioItem = ({ comentario }) => (
    <View style={styles.comentarioItem}>
      <View style={styles.comentarioHeader}>
        <Text style={styles.comentarioUsuario}>{comentario.nombre_usuario}</Text>
        <View style={styles.estrellas}>
          {[1, 2, 3, 4, 5].map((estrella) => (
            <AntDesign
              key={estrella}
              name={estrella <= comentario.calificacion ? 'star' : 'staro'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
      <View style={styles.comentarioBurbuja}>
        <Text style={styles.comentarioTexto}>{comentario.comentario}</Text>
      </View>
    </View>
  );

  const RatingPicker = () => (
    <View style={styles.ratingPicker}>
      {[1, 2, 3, 4, 5].map((estrella) => (
        <TouchableOpacity key={estrella} onPress={() => setNuevaCalificacion(estrella)}>
          <AntDesign name={estrella <= nuevaCalificacion ? 'star' : 'staro'} size={30} color="#FFD700" />
        </TouchableOpacity>
      ))}
    </View>
  );

  if (!libro) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando detalles del libro...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${ip}/PowerLetters_TeresaVersion/api/images/libros/${imagenLibro}` }}
          style={styles.image}
          onTouchEnd={handleImagePress} // Cambia onPress por onTouchEnd
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{tituloLibro}</Text>
        <Text style={styles.text}>Autor: {libro.nombre_autor}</Text>
        <Text style={styles.text}>Precio: ${precioLibro}</Text>
        <Text style={styles.text}>Descripción: {descripcionLibro}</Text>
        <Text style={styles.text}>Clasificación: {libro.nombre_clasificacion}</Text>
        <Text style={styles.text}>Editorial: {libro.nombre_editorial}</Text>
        <Text style={styles.text}>Existencias: {libro.existencias}</Text>
        <Text style={styles.text}>Género: {libro.nombre_genero}</Text>
      </View>

      <Text style={styles.sectionTitle}>Comentarios</Text>
      {comentarios.map((comentario) => (
        <ComentarioItem key={comentario.id_comentario} comentario={comentario} />
      ))}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={nuevoComentario}
          onChangeText={setNuevoComentario}
          placeholder="Escribe tu comentario"
          multiline
        />
        <RatingPicker />
        <TouchableOpacity style={styles.enviarButton} onPress={enviarComentario}>
          <Text style={styles.enviarButtonText}>Enviar comentario</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Esto permite cerrar el modal al presionar el botón de retroceso en Android
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={cerrarModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C3D2E',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: '#5C3D2E',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C3D2E',
    marginVertical: 15,
  },
  comentarioItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  comentarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comentarioUsuario: {
    fontWeight: 'bold',
    color: '#5C3D2E',
  },
  estrellas: {
    flexDirection: 'row',
  },
  comentarioBurbuja: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  comentarioTexto: {
    color: '#5C3D2E',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  enviarButton: {
    backgroundColor: '#5064d4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  enviarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#5064d4',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullImage: {
    width: '90%',
    height: '90%',
  },
});
