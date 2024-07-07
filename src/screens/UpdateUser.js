import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import Buttons from '../components/Buttons/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes';
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

const ModalEditarUsuario = ({ setModalVisible, modalVisible, userId, getUserData }) => {
  const ip = Constantes.IP;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');

  const duiRegex = /^\d{8}-\d$/;
  const telefonoRegex = /^\d{4}-\d{4}$/;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=getUserById&id=${userId}`);
        const data = await response.json();
        if (data.status) {
          const user = data.user;
          setNombre(user.nombreCliente);
          setApellido(user.apellidoCliente);
          setEmail(user.correoCliente);
          setDireccion(user.direccionCliente);
          setDui(user.duiCliente);
          setFechaNacimiento(user.nacimientoCliente);
          setTelefono(user.telefonoCliente);
          setDate(new Date(user.nacimientoCliente));
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al intentar obtener los datos del usuario');
      }
    };

    fetchUserData();
  }, [userId]);

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

  const handleUpdateUser = async () => {
    try {
      const fechaMinima = new Date();
      fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);

      if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
        !dui.trim() || !fechaNacimiento.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
        Alert.alert("Debes llenar todos los campos");
        return;
      } else if (!duiRegex.test(dui)) {
        Alert.alert("El DUI debe tener el formato correcto (########-#)");
        return;
      } else if (!telefonoRegex.test(telefono)) {
        Alert.alert("El teléfono debe tener el formato correcto (####-####)");
        return;
      } else if (date > fechaMinima) {
        Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
        return;
      }

      const formData = new FormData();
      formData.append('id', userId);
      formData.append('nombreCliente', nombre);
      formData.append('apellidoCliente', apellido);
      formData.append('correoCliente', email);
      formData.append('direccionCliente', direccion);
      formData.append('duiCliente', dui);
      formData.append('nacimientoCliente', fechaNacimiento);
      formData.append('telefonoCliente', telefono);
      formData.append('claveCliente', clave);
      formData.append('confirmarClave', confirmarClave);

      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=updateUser`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Datos Actualizados correctamente');
        getUserData();
      } else {
        Alert.alert('Error', data.error);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Ocurrió un error al intentar actualizar el usuario');
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Actualizar Usuario</Text>
            <Input
              placeHolder='Nombre del usuario'
              setValor={nombre}
              setTextChange={setNombre}
            />
            <Input
              placeHolder='Apellido del usuario'
              setValor={apellido}
              setTextChange={setApellido}
            />
            <InputEmail
              placeHolder='Correo del usuario'
              setValor={email}
              setTextChange={setEmail} />
            <InputMultiline
              placeHolder='Dirección del usuario'
              setValor={direccion}
              valor={direccion}
              setTextChange={setDireccion} />
            <MaskedInputDui
              dui={dui}
              setDui={setDui} />
            <View style={styles.contenedorFecha}>
              <Text style={styles.fecha}>Fecha Nacimiento</Text>
              <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>Seleccionar Fecha:</Text></TouchableOpacity>
              <Text style={styles.fecha}>Selección: {fechaNacimiento}</Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())}
                  maximumDate={new Date()}
                  onChange={onChange}
                />
              )}
            </View>
            <MaskedInputTelefono
              telefono={telefono}
              setTelefono={setTelefono} />
            <Input
              placeHolder='Contraseña'
              contra={true}
              setValor={clave}
              setTextChange={setClave} />
            <Input
              placeHolder='Confirmar contraseña'
              contra={true}
              setValor={confirmarClave}
              setTextChange={setConfirmarClave} />
            <Buttons
              textoBoton='Actualizar'
              accionBoton={handleUpdateUser}
              color='#FF6F61'
            />
            <Buttons
              textoBoton='Cancelar'
              accionBoton={handleCancel}
              color='#FF6F61'
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditarUsuario;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fecha: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  fechaSeleccionar: {
    fontSize: 16,
    color: '#FF6F61',
    marginBottom: 10,
  },
  contenedorFecha: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});