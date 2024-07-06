
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';


export default function InputField({ placeHolder, setValor, contra, setTextChange }) {

  return (

    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={setValor}
      placeholderTextColor={'gray'}
      secureTextEntry={contra}
      onChangeText={setTextChange}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: 'white',
    color: "black",
    width: "100%",
    height: Platform.OS === 'ios' ? 50 : 50, // Estilo de la barra de pestañas, altura diferente para iOS y Android
    borderRadius: 5,
    padding: 5,
    marginVertical: 10
  },

});