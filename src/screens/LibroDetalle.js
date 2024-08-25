import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes';

export default function DetalleLibro({ route }) {
  const { id_libro, tituloLibro, descripcionLibro, precioLibro, imagenLibro } = route.params;
  const [libro, setLibro] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevaCalificacion, setNuevaCalificacion] = useState(5);
  const ip = Constantes.IP;

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
      <Text></Text>
      <Text></Text>
      <View style={styles.card}>
        <Image
          source={{ uri: `${ip}/PowerLetters_TeresaVersion/api/images/libros/${imagenLibro}` }}
          style={styles.image}
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
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
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
    marginTop: 20,
    marginBottom: 10,
    color: '#5C3D2E',
  },
  comentarioItem: {
    marginBottom: 15,
  },
  comentarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  comentarioUsuario: {
    fontWeight: 'bold',
    color: '#5C3D2E',
  },
  estrellas: {
    flexDirection: 'row',
  },
  comentarioBurbuja: {
    backgroundColor: '#E6E6FA',
    borderRadius: 15,
    padding: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  comentarioTexto: {
    color: '#5C3D2E',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#5C3D2E',
  },
  ratingPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  enviarButton: {
    backgroundColor: '#3B5998',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  enviarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
