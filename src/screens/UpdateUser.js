import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa el selector de fecha y hora
import { Ionicons } from '@expo/vector-icons'; // Importa iconos de Ionicons
import * as Constantes from '../utils/constantes'; // Importa constantes para la configuración de la API
import Input from '../components/Inputs/Input'; // Componente de entrada de texto
import InputMultiline from '../components/Inputs/InputMultiline'; // Componente de entrada de texto multilinea
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono'; // Componente para entrada de teléfono con máscara
import MaskedInputDui from '../components/Inputs/MaskedInputDui'; // Componente para entrada de DUI con máscara
import InputEmail from '../components/Inputs/InputEmail'; //Componente para entrada de correo electrónico
import { useFocusEffect } from '@react-navigation/native'; // Hook para manejar el enfoque de la pantalla

export default function UpdateProfile({ navigation }) {
  const ip = Constantes.IP; // IP de la API
  const [date, setDate] = useState(new Date());  // Estado para almacenar la fecha
  const [mode, setMode] = useState('date'); // Estado para el modo del selector de fecha
  const [show, setShow] = useState(false);  // Estado para mostrar el selector de fecha
  const [editando, setEditando] = useState(false); // Estado para indicar si se está editando
  const [refreshing, setRefreshing] = useState(false); // Estado para el refresco
  // Estados para almacenar los datos del usuario
  const [idCliente, setIdCliente] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
// Hook para validar la sesión cuando la pantalla está enfocada
  useFocusEffect(
    React.useCallback(() => {
      validarSesion();
    }, [])
  );
// Función para validar la sesión del usuario
  const validarSesion = async () => {
    try {
       // Realiza una solicitud GET a la API para verificar la sesión
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      // Convierte la respuesta a JSON

      // Verifica si la sesión es válida
      if (data.status === 1) {
        obtenerDatosUsuario();  // Llama a la función para obtener los datos del usuario
      } else {
        Alert.alert("Sesión no activa", "Por favor, inicie sesión."); // Muestra un mensaje si la sesión no es activa
        navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
      }
    } catch (error) {
      console.error(error); // Imprime el error en la consola
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');  // Muestra un mensaje de error
    }
  };

  const obtenerDatosUsuario = async () => {
    try {
      // Realiza una solicitud GET a la API para obtener los datos del perfil del usuario
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=readProfile`, {
        method: 'GET',
      });
      // Convierte la respuesta a JSON
      const data = await response.json();
      // Verifica si la respuesta es exitosa
      if (data.status) {
        // Actualiza los estados con los datos del usuario obtenidos
        setIdCliente(data.dataset.id_usuario); // Establece el ID del usuario
        setNombre(data.dataset.nombre_usuario); // Establece el nombre del usuario
        setApellido(data.dataset.apellido_usuario); // Establece el apellido
        setEmail(data.dataset.correo_usuario); //Establece el correo
        setDireccion(data.dataset.direccion_usuario);
        setDui(data.dataset.dui_usuario);
        setFechaNacimiento(data.dataset.nacimiento_usuario);
        setTelefono(data.dataset.telefono_usuario);
      } else {
        // Muestra un mensaje de error si no se pueden obtener los datos
        Alert.alert('Error al obtener datos del usuario', data.error);
      }
    } catch (error) {
      // Imprime el error en la consola
        // Muestra un mensaje de error si ocurre un problema en la solicitud
      console.error(error);
      Alert.alert('Ocurrió un error al intentar obtener los datos del usuario');
    }
  };

  const onChange = (event, selectedDate) => {
    // Obtiene la fecha seleccionada o la fecha actual si no se selecciona nada
    const currentDate = selectedDate || date;
     // Oculta el selector de fecha
    setShow(false);
    // Actualiza el estado con la fecha seleccionada
    setDate(currentDate);
    // Obtiene los componentes de año, mes y día de la fecha seleccionada
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    // Formatea la fecha en el formato deseado (YYYY-MM-DD)
    const fechaNueva = `${year}-${month}-${day}`;
    // Actualiza el estado de la fecha de nacimiento con el nuevo formato
    setFechaNacimiento(fechaNueva);
  };

  const showMode = (currentMode) => {
    // Muestra el selector de fecha/hora
    setShow(true);
     // Establece el modo del selector (puede ser 'date' o 'time')
    setMode(currentMode);
  };

  const showDatepicker = () => {
     // Llama a showMode para mostrar el selector de fecha
    showMode('date');
  };

  const handleUpdate = async () => {
    try {
      // Verifica que todos los campos estén llenos
      if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
        !dui.trim() || !fechaNacimiento.trim() || !telefono.trim()) {
        Alert.alert("Debes llenar todos los campos"); // Muestra un mensaje de alerta si falta algún campo
        return;  // Sale de la función si hay campos vacíos
      }
      // Crea un objeto FormData para enviar los datos
      const formData = new FormData();
      formData.append('id_usuario', idCliente);
      formData.append('nombre_usuario', nombre);
      formData.append('apellido_usuario', apellido);
      formData.append('correo_usuario', email);
      formData.append('direccion_usuario', direccion);
      formData.append('dui_usuario', dui);
      formData.append('nacimiento_usuario', fechaNacimiento);
      formData.append('telefono_usuario', telefono);
       // Realiza una solicitud POST a la API para actualizar el perfil
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=editProfile`, {
        method: 'POST',
        body: formData // Envía los datos del formulario
      });

      const data = await response.json(); // Convierte la respuesta a JSON
      // Verifica si la actualización fue exitosa
      if (data.status) {
        Alert.alert('Éxito', 'Datos actualizados correctamente');
        setEditando(false); // Cambia el estado de edición a falso
        obtenerDatosUsuario();  // Llama a la función para obtener los datos actualizados del usuario

        // Volver a Home y forzar recarga
        navigation.navigate('Home', { updated: true });
      } else {
        Alert.alert('Error', data.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al intentar actualizar los datos del usuario');
    }
  };
// Función para manejar la cancelación de la edición
  const handleCancel = () => {
    setEditando(false);
    obtenerDatosUsuario();
  };
// Función para manejar el refresco de los datos
  const onRefresh = () => {
    setRefreshing(true);
    obtenerDatosUsuario().then(() => setRefreshing(false));
  };
// useEffect para obtener los datos del usuario al montar el componente
  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  // Renderizado del componente
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Actualizar perfil</Text>

      <Image source={require('../img/registro.png')} style={styles.image} />

      <Input
        placeHolder='Nombre del usuario'
        setValor={nombre}
        setTextChange={setNombre}
        editable={editando}
      />
      <Input
        placeHolder='Apellido del usuario'
        setValor={apellido}
        setTextChange={setApellido}
        editable={editando}
      />
      <InputEmail
        placeHolder='Correo del usuario'
        setValor={email}
        setTextChange={setEmail}
        editable={editando}
      />
      <InputMultiline
        placeHolder='Dirección del usuario'
        setValor={setDireccion}
        valor={direccion}
        setTextChange={setDireccion}
        editable={editando}
      />
      <MaskedInputDui
        dui={dui}
        setDui={setDui}
        editable={editando}
      />
      <View style={styles.contenedorFecha}>
        <Text style={styles.fecha}>Fecha Nacimiento</Text>
        {editando && (
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.fechaSeleccionar}>Seleccionar Fecha:</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.fecha}>Selección: {fechaNacimiento}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <MaskedInputTelefono
        telefono={telefono}
        setTelefono={setTelefono}
        editable={editando}
      />
      
      <View style={styles.iconContainer}>
        {editando ? (
          <>
            <TouchableOpacity onPress={handleUpdate} style={styles.iconButton}>
              <Ionicons name="checkmark-circle" size={52} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.iconButton}>
              <Ionicons name="close-circle" size={52} color="#FF6F61" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => setEditando(true)} style={styles.iconButton}>
            <Ionicons name="create" size={52} color="#4CAF50" />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f0ecfc',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 85,
    marginTop: 60,
  },
  contenedorFecha: {
    width: '100%',
    marginVertical: 10,
  },
  fecha: {
    fontSize: 16,
    color: '#000',
  },
  fechaSeleccionar: {
    fontSize: 16,
    color: '#0000ff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconButton: {
    marginHorizontal: 10,
  },
});
