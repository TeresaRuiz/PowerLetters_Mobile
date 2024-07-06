import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Buttons({ textoBoton, accionBoton }) {
    return (
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FF6F61',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
