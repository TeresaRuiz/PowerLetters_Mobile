import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes';
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import { useFocusEffect } from '@react-navigation/native';

export default function UpdateProfile({ navigation }) {
    const ip = Constantes.IP;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [idCliente, setIdCliente] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            validarSesion();
        }, [])
    );

    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();

            if (data.status === 1) {
                obtenerDatosUsuario(); // Llama a la función para obtener los datos del usuario
            } else {
                Alert.alert("Sesión no activa", "Por favor, inicie sesión.");
                navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    };

    const obtenerDatosUsuario = async () => {
        try {
            const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=getClientData`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setIdCliente(data.data.id_cliente);
                setNombre(data.data.nombre_cliente);
                setApellido(data.data.apellido_cliente);
                setEmail(data.data.correo_cliente);
                setDireccion(data.data.direccion_cliente);
                setDui(data.data.dui_cliente);
                setFechaNacimiento(data.data.nacimiento_cliente);
                setTelefono(data.data.telefono_cliente);
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
                !dui.trim() || !fechaNacimiento.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            }

            const formData = new FormData();
            formData.append('idCliente', idCliente);
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('nacimientoCliente', fechaNacimiento);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=updateClient`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data); // Debugging line
            if (data.status) {
                Alert.alert('Datos actualizados correctamente');
                navigation.navigate('Libros'); // Navega a la pantalla de perfil o donde desees
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Ocurrió un error al intentar actualizar los datos del usuario');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Actualizar Perfil</Text>
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
                setValor={setDireccion}
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
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <MaskedInputTelefono
                telefono={telefono}
                setTelefono={setTelefono} />
            <Input
                placeHolder='Clave del usuario'
                setValor={clave}
                setTextChange={setClave}
                contra={true}
            />
            <Input
                placeHolder='Confirmar clave del usuario'
                setValor={confirmarClave}
                setTextChange={setConfirmarClave}
                contra={true}
            />
            <Buttons
                textoBoton='Actualizar'
                accionBoton={handleUpdate}
                color='#FF6F61'
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0ecfc',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
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
    }
});
