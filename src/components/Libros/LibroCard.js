import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function LibroCard({
  ip,
  imagenLibro,
  idLibro,
  tituloLibro,
  descripcionLibro,
  precioLibro,
  accionBotonLibro,
  navigation,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigation.navigate('LibroDetalle', {
          id_libro: idLibro,
          tituloLibro,
          descripcionLibro,
          precioLibro,
          imagenLibro,
          ip,
        })}
      >
        <Image
          source={{ uri: `${ip}/PowerLetters_TeresaVersion/api/images/libros/${imagenLibro}` }}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>#{idLibro}</Text>
        <Text style={styles.textTitle}>Título: <Text style={styles.textDentro}>{tituloLibro}</Text></Text>
        <Text style={styles.textTitle}>Descripción: <Text style={styles.textDentro}>{descripcionLibro}</Text></Text>
        <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precioLibro}</Text></Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={accionBotonLibro}
        >
          <FontAwesome name="plus-circle" size={24} color="white" />
          <Text style={styles.cartButtonText}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 1,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '40%',
    alignItems: 'center',
  },
  infoContainer: {
    width: '60%',
    paddingLeft: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '700',
  },
  textDentro: {
    fontWeight: '400',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },
});
