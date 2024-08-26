import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, Alert, StyleSheet } from 'react-native';
import Button3 from '../components/Buttons/Button3'; // Componente de botón personalizado
import * as Constantes from '../utils/constantes'; // Importa constantes para la configuración de la API

const PinVerificationScreen = ({ route, navigation }) => {
    // Estado para almacenar el PIN ingresado como un array de 6 caracteres
    const [pin, setPin] = useState(Array(6).fill(''));
    const { email } = route.params; // Obtiene el correo electrónico de los parámetros de la ruta
    const ip = Constantes.IP; // IP de la API
    // Referencia para los inputs del PIN
    const inputs = useRef([]);
    // Función para manejar la verificación del PIN
    const handleVerifyPin = async () => {
        const pinString = pin.join(''); // Convierte el array de PIN a una cadena
        if (pinString.length !== 6) { // Verifica que el PIN tenga 6 caracteres
            Alert.alert('Error', 'Por favor, ingresa el PIN completo.');
            return;
        }

        try {
             // Realiza una solicitud POST a la API para verificar el PIN
            const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=verificarPin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `correo=${email}&pin=${pinString}`, // Envía el correo y el PIN
            });

            const data = await response.json();
             // Convierte la respuesta a JSON
            // Verifica el estado de la respuesta
            if (data.status === 1) {
                Alert.alert('Éxito', 'PIN verificado correctamente', [
                    { text: 'OK', onPress: () => navigation.navigate('NewPassword', { id_usuario: data.id_usuario, email: email }) }
                ]);
            } else {
                Alert.alert('Error', data.error || 'PIN inválido o expirado'); // Muestra un mensaje de error si el PIN es inválido
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error en la conexión'); // Maneja errores de conexión
        }
    };
// Función para manejar el cambio en los inputs del PIN
    const handlePinChange = (text, index) => {
        const newPin = [...pin]; // Crea una copia del estado del
        newPin[index] = text;  // Actualiza el valor del PIN en el índice correspondiente
        setPin(newPin); // Actualiza el estado del PIN

        // Mover el foco al siguiente input si se ingresó un número
        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }, index) => {
        // Si se presiona Backspace y el campo actual está vacío, mover el foco al anterior
        if (key === 'Backspace' && index > 0 && pin[index] === '') {
            inputs.current[index - 1].focus();
        }
    };
// Renderizado del componente
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificar PIN</Text>
            <Image source={require('../img/onboarding2.png')} style={styles.logo} />
            <View style={styles.pinContainer}>
                {pin.map((value, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref)}
                        style={styles.pinInput}
                        value={value}
                        onChangeText={(text) => handlePinChange(text, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        textAlign="center"
                    />
                ))}
            </View>
            <Button3 style={styles.button} onPress={handleVerifyPin}>
                <Text style={styles.buttonText}>Verificar PIN</Text>
            </Button3>
        </View>
    );
};

export default PinVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0ecfc',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logo: {
        width: 250,
        height: 235,
        marginBottom: 30,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 15,
    },
    pinInput: {
        backgroundColor: 'white',
        width: 40,
        height: 50,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3046BC',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});