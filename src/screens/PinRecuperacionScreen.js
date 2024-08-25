import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, Alert, StyleSheet } from 'react-native';
import Button3 from '../components/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const PinVerificationScreen = ({ route, navigation }) => {
    const [pin, setPin] = useState(Array(6).fill(''));
    const { email } = route.params;
    const ip = Constantes.IP;

    const inputs = useRef([]);

    const handleVerifyPin = async () => {
        const pinString = pin.join('');
        if (pinString.length !== 6) {
            Alert.alert('Error', 'Por favor, ingresa el PIN completo.');
            return;
        }

        try {
            const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=verificarPin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `correo=${email}&pin=${pinString}`,
            });

            const data = await response.json();

            if (data.status === 1) {
                Alert.alert('Éxito', 'PIN verificado correctamente', [
                    { text: 'OK', onPress: () => navigation.navigate('NewPassword', { id_usuario: data.id_usuario, email: email }) }
                ]);
            } else {
                Alert.alert('Error', data.error || 'PIN inválido o expirado');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error en la conexión');
        }
    };

    const handlePinChange = (text, index) => {
        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);

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