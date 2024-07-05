import React, { useState } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputTelefono() {
    const [telefono, setTelefono] = useState('');

    return (
        <TextInputMask
            style={styles.input}
            placeholder="Teléfono del usuario"
            placeholderTextColor="#A1A1A1"
            type={'custom'}
            options={{
                mask: '9999-9999' // Formato para el número de teléfono
            }}
            value={telefono}
            onChangeText={(text) => setTelefono(text)}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
})
