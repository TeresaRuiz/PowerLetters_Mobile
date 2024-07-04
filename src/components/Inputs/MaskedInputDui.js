import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputDui({ dui, setDui }) {
    return (
        <TextInputMask
            style={styles.input}
            placeholder="DUI del usuario"
            placeholderTextColor="#A1A1A1"
            type={'custom'}
            options={{
                mask: '99999999-9' // Formato para el número de DUI
            }}
            value={dui}
            onChangeText={setDui}
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
});