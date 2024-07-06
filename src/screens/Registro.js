import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../components/Inputs/InputField';
import SocialButton from '../components/Buttons/SocialButton';
import InputMultiline from '../components/Inputs/InputMultiline';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import RegisterButton from '../components/Buttons/Button';

export default function Registro({ navigation }) {
    const ip = Constantes.IP;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [direccion, setDireccion] = useState('')
    const [dui, setDui] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [clave, setClave] = useState('')
    const [confirmarClave, setConfirmarClave] = useState('')

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    // Función para manejar la selección de fecha
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

    const handleLogout = async () => {
        /*
                try {
                    const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
                        method: 'GET'
                    });
        
                    const data = await response.json();
        
                    if (data.status) {
                        navigation.navigate('Sesion');
                    } else {
                        console.log(data);
                        // Alert the user about the error
                        Alert.alert('Error', data.error);
                    }
                } catch (error) {
                    console.error(error, "Error desde Catch");
                    Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
                } */
        navigation.navigate('Registro');
    };

    const handleCreate = async () => {
        try {

            // Calcular la fecha mínima permitida (18 años atrás desde la fecha actual)
            const fechaMinima = new Date();
            fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
            // Validar los campos
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

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('nacimientoCliente', fechaNacimiento);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);


            const response = await fetch(`${ip}/NewPowerLetters/api/services/public/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>¡Regístrate!</Text>
            <Text style={styles.subtitle}>Crea tu cuenta en Power Letters</Text>
            <Image source={require('../img/registro.png')} style={styles.image} />

            <InputField
                placeHolder='Nombre del usuario'
                setValor={nombre}
                setTextChange={setNombre}
            />
            <InputField
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
                <Text style={styles.fecha}>Seleccion: {fechaNacimiento}</Text>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())} // Fecha mínima permitida (100 años atrás desde la fecha actual)
                        maximumDate={new Date()} // Fecha máxima permitida (fecha actual)
                        onChange={onChange}
                    />
                )}
            </View>
            <MaskedInputTelefono
                telefono={telefono}
                setTelefono={setTelefono} />
            <InputField
                placeHolder='Contraseña'
                contra={true}
                setValor={clave}
                setTextChange={setClave} />
            <InputField
                placeHolder='Confirmar contraseña'
                contra={true}
                setValor={confirmarClave}
                setTextChange={setConfirmarClave} />

            <RegisterButton onPress={handleCreate} />
            <Text style={styles.orText}>― O regístrate con ―</Text>
            <View style={styles.socialContainer}>
                <SocialButton name="google" size={30} color="#DB4437" />
                <SocialButton name="apple" size={30} color="#000000" />
                <SocialButton name="facebook" size={30} color="#3B5998" />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Sesion')}>
                <Text style={styles.signInText}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0ecfc',
        marginTop: 20,
        paddingTop: Constants.statusBarHeight + 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 25,
        color: 'black',
        marginBottom: 30,
        textAlign: 'center',
    },
    signUpButton: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FF6F61',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orText: {
        fontSize: 14,
        color: '#000000',
        marginVertical: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    signInText: {
        color: '#000000',
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    contenedorFecha: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
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
});

