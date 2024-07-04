import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../components/Inputs/InputField';
import SocialButton from '../components/Buttons/SocialButton';
import InputMultiline from '../components/Inputs/InputMultiline'
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function Registro({ navigation }) {
    const ip = Constantes.IP;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [apellidoUsuario, setApellidoUsuario] = useState('');
    const [duiUsuario, setDuiUsuario] = useState('');
    const [correoUsuario, setCorreoUsuario] = useState('');
    const [telefonoUsuario, setTelefonoUsuario] = useState('');
    const [direccionUsuario, setDireccionUsuario] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [claveUsuario, setClaveUsuario] = useState('');
    const [confirmarClaveUsuario, setConfirmarClaveUsuario] = useState('');

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    /*
    Codigo para mostrar el datetimepicker
    */

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        /*
        Codigo para convertir la fecha al formato año-mes-dia */

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fechaNueva = `${year}-${month}-${day}`;
        setFechaNacimiento(fechaNueva)
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
        navigation.navigate('Sesion');
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
            formData.append('nombreCliente', nombreUsuario);
            formData.append('apellidoCliente', apellidoUsuario);
            formData.append('correoCliente', correoUsuario);
            formData.append('direccionCliente', direccionUsuario);
            formData.append('duiCliente', duiUsuario);
            formData.append('fechaNacimiento', fechaNacimiento);
            formData.append('telefonoCliente', telefonoUsuario);
            formData.append('claveCliente', claveUsuario);
            formData.append('confirmarClave', confirmarClaveUsuario);

            const response = await fetch(`${ip}/PowerLetters_Mobile/api/services/public/usuario.php?action=signUpMovil`, {
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
                placeholder="Nombre del usuario"
                setValor={nombreUsuario}
                onChangeText={setNombreUsuario}
            />
            <InputField
                placeholder="Apellido del usuario"
                setValor={apellidoUsuario}
                onChangeText={setApellidoUsuario}
            />
            <MaskedInputDui
                placeholder="Ingresa tu DUI"
                setValor={duiUsuario}
                onChangeText={(text) => setDuiUsuario(text)}
            />
            <InputEmail
                placeholder="Correo del usuario"
                setValor={correoUsuario}
                onChangeText={setCorreoUsuario}
            />
            <MaskedInputTelefono
                placeholder="Ingresa tu teléfono"
                value={telefonoUsuario}
                onChangeText={(text) => setTelefonoUsuario(text)}
            />
            <InputField
                placeholder="Dirección del usuario"
                setValor={direccionUsuario}
                onChangeText={setDireccionUsuario}
            />
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
            <InputField
                placeholder="Ingresa tu contraseña"
                setValor={claveUsuario}
                onChangeText={setClaveUsuario}
                secureTextEntry
            />
            <InputField
                placeholder="Confirma tu contraseña"
                setValor={confirmarClaveUsuario}
                onChangeText={setConfirmarClaveUsuario}
                secureTextEntry
            />
            <TouchableOpacity style={styles.signUpButton} onPress={() => { /* Your sign up logic here */ }}>
                <Text style={styles.signUpButtonText}>Registrarse</Text>
            </TouchableOpacity>
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
        paddingBottom: 20, // Ajusta este valor según tus necesidades
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0ecfc',
        marginTop: 20,
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
        width: 220,
        height: 220,
        marginBottom: 20,
    },
    fecha: {
        fontWeight: '600',
        color: '#000000'
    },
    fechaSeleccionar: {
        fontWeight: '700',
        color: '#322C2B',
        textDecorationLine: 'underline'
    },
    contenedorFecha: {
        backgroundColor: 'white',
        color: "#fff", fontWeight: '800',
        width: '100%',
        borderRadius: 8,
        padding: 5,
        marginVertical: 10
    }
});

