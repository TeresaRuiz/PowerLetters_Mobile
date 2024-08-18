import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de instalar esta librería
import * as Constantes from '../utils/constantes';
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import { useFocusEffect } from '@react-navigation/native';

export default function UpdateProfile({ navigation }) {
  const ip = Constantes.IP;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [editando, setEditando] = useState(false);

  const [idCliente, setIdCliente] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      validarSesion();
    }, [])
  );

  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();

      if (data.status === 1) {
        obtenerDatosUsuario();
      } else {
        Alert.alert("Sesión no activa", "Por favor, inicie sesión.");
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  };

  const obtenerDatosUsuario = async () => {
    try {
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=readProfile`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setIdCliente(data.dataset.id_usuario);
        setNombre(data.dataset.nombre_usuario);
        setApellido(data.dataset.apellido_usuario);
        setEmail(data.dataset.correo_usuario);
        setDireccion(data.dataset.direccion_usuario);
        setDui(data.dataset.dui_usuario);
        setFechaNacimiento(data.dataset.nacimiento_usuario);
        setTelefono(data.dataset.telefono_usuario);
      } else {
        Alert.alert('Error al obtener datos del usuario', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Ocurrió un error al intentar obtener los datos del usuario');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const fechaNueva = `${year}-${month}-${day}`;
    setFechaNacimiento(fechaNueva);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleUpdate = async () => {
    try {
      if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
        !dui.trim() || !fechaNacimiento.trim() || !telefono.trim()) {
        Alert.alert("Debes llenar todos los campos");
        return;
      }

      const formData = new FormData();
      formData.append('id_usuario', idCliente);
      formData.append('nombre_usuario', nombre);
      formData.append('apellido_usuario', apellido);
      formData.append('correo_usuario', email);
      formData.append('direccion_usuario', direccion);
      formData.append('dui_usuario', dui);
      formData.append('nacimiento_usuario', fechaNacimiento);
      formData.append('telefono_usuario', telefono);

      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=editProfile`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Éxito', 'Datos actualizados correctamente');
        setEditando(false);
        obtenerDatosUsuario();
      } else {
        Alert.alert('Error', data.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al intentar actualizar los datos del usuario');
    }
  };

  const handleCancel = () => {
    setEditando(false);
    obtenerDatosUsuario();
  };

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  // Renderizado del componente
  return (
    <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.title}></Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 85
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
    justifyContent: 'space-between',
    marginTop: 20,
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
