import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Definición del componente ProductoCard
export default function ProductoCard({
  ip, // Dirección IP del servidor para acceder a las imágenes
  imagenProducto, // Nombre del archivo de imagen del libro
  idProducto, // ID único del libro
  nombreProducto, //Título o nombre del libro
  descripcionProducto, //Descripción del libro
  precioProducto,  // Precio del libro
  existenciasProducto, // Cantidad de existencias del libro
  accionBotonProducto,  // Función a ejecutar al presionar el botón "Añadir al carrito"
}) {
  return (
    // Contenedor principal de la tarjeta del libro
    <View style={styles.card}>
      {/* Contenedor de la imagen del libro */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/NewPowerLetters/api/images/productos/${imagenProducto}` }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {/* Contenedor de la información del libro */}
      <View style={styles.infoContainer}>
        {/* Mostrar el ID del libro */}
        <Text style={styles.text}>#{idProducto}</Text>
        {/* Mostrar el título del libro */}
        <Text style={styles.textTitle}>Título: <Text style={styles.textDentro}>{nombreProducto}</Text></Text>
        {/* Mostrar la descripción del libro */}
        <Text style={styles.textTitle}>Descripción: <Text style={styles.textDentro}>{descripcionProducto}</Text></Text>
        {/* Mostrar el precio del libro */}
        <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precioProducto}</Text></Text>
        {/* Mostrar las existencias del libro */}
        <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{existenciasProducto} {(existenciasProducto === 1) ? 'Unidad' : 'Unidades'}</Text></Text>
        {/* Botón "Añadir al carrito" */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={accionBotonProducto}
        >
          {/* Icono de círculo más */}
          <FontAwesome name="plus-circle" size={24} color="white" />
           {/* Texto del botón */}
          <Text style={styles.cartButtonText}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// Definición de estilos
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