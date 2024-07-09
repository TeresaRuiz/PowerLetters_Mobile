import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';
// Importación de componentes personalizados
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import SocialButton from '../components/Inputs/SocialButton';


export default function SignUp({ navigation }) {
    const ip = Constantes.IP;
    // Declaración de estados
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

    // Código para mostrar el DateTimePicker
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);

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

    // Código para manejar el registro del usuario
    const handleCreate = async () => {
        try {
            // Validar que el usuario sea mayor de 18 años
            const fechaMinima = new Date();
            fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
            // Validar que todos los campos estén llenos
            if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
                !dui.trim() || !fechaNacimiento.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            } else if (!duiRegex.test(dui)) {
                // Validar el formato del DUI y el teléfono
                Alert.alert("El DUI debe tener el formato correcto (########-#)");
                return;
            } else if (!telefonoRegex.test(telefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            } else if (date > fechaMinima) {
                Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
                return;
            }
            // Crear un FormData con los datos a enviar
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
            // Hacer una petición para registrar al usuario
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
                textoBoton='Registrate'
                accionBoton={handleCreate}
                color='#FF6F61'
            />
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
}

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
