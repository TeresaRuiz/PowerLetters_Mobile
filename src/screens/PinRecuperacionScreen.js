import React, { useState } from 'react';
import { View, Text, Image, TextInput, Alert, StyleSheet } from 'react-native';
import Button3 from '../components/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const PinVerificationScreen = ({ route, navigation }) => {
    // Estado para almacenar el PIN ingresado por el usuario
    const [pin, setPin] = useState('');
    // Extraer el email de los parámetros de la ruta
    const { email } = route.params;
    const ip = Constantes.IP;

    // Función para manejar la verificación del PIN
    const handleVerifyPin = async () => {
        try {
            // Verificar que el PIN no esté vacío
            if (!pin.trim()) {
                Alert.alert('Error', 'Por favor, ingresa el PIN.');
                return;
            }

            // Realizar una solicitud POST al servidor para verificar el PIN
            const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=verificarPin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `correo=${email}&pin=${pin}`,
            });

            const data = await response.json();

            if (data.status === 1) {
                // Si el PIN es válido, mostrar una alerta de éxito y navegar a la pantalla de nueva contraseña
                Alert.alert('Éxito', 'PIN verificado correctamente', [
                    { text: 'OK', onPress: () => navigation.navigate('NewPassword', { id_usuario: data.id_usuario, email: email }) }
                ]);
            } else {
                // Si el PIN no es válido, mostrar una alerta
                Alert.alert('Error', data.error || 'PIN inválido o expirado');
            }
        } catch (error) {
            // Mostrar una alerta en caso de error de conexión
            Alert.alert('Error', 'Ocurrió un error en la conexión');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificar PIN</Text>
            <Image source={require('../img/onboarding2.png')} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Ingrese el PIN"
                onChangeText={text => setPin(text)}
                value={pin}
                keyboardType="numeric"
            />
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
    input: {
        width: '80%',
        backgroundColor: '#f0f0f0',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    passwordContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
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
    link: {
        color: '#007bff',
        fontSize: 16,
    },
});