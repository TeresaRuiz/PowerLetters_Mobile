import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para el ícono de "ojo"
import Button3 from '../components/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const NewPasswordScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la nueva contraseña
  const [showNewPassword, setShowNewPassword] = useState(false); // Estado para mostrar/ocultar la nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación de la contraseña
  const { id_usuario, email } = route.params; // Obtiene el id_usuario y el email de los parámetros de la ruta
  const ip = Constantes.IP;

  // Función para manejar el cambio de contraseña
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) { // Verifica que ningún campo esté vacío
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) { // Verifica que las contraseñas coincidan
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) { // Verifica que la nueva contraseña tenga al menos 6 caracteres
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Hace una solicitud para cambiar la contraseña
      const response = await fetch(`${ip}/PowerLetters_TeresaVersion/api/services/public/usuario.php?action=cambiarClaveConPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_usuario=${id_usuario}&nuevaClave=${newPassword}`, // Envía el id_usuario y la nueva contraseña en el cuerpo de la solicitud
      });

      const data = await response.json();

      if (data.status === 1) { // Verifica si la solicitud fue exitosa
        Alert.alert('Éxito', 'Contraseña cambiada exitosamente', [
          { text: 'OK', onPress: () => navigation.navigate('Sesion') } // Navega a la pantalla de login después de mostrar el mensaje de éxito
        ]);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un error al cambiar la contraseña');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <Image source={require('../img/onboarding3.png')} style={styles.logo} />
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Nueva contraseña"
          onChangeText={text => setNewPassword(text)} // Actualiza el estado de newPassword cuando cambia el texto
          value={newPassword}
          secureTextEntry={!showNewPassword} // Asegura que la contraseña esté oculta si showNewPassword es falso
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
          <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Confirmar nueva contraseña"
          onChangeText={text => setConfirmPassword(text)} // Actualiza el estado de confirmPassword cuando cambia el texto
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword} // Asegura que la contraseña esté oculta si showConfirmPassword es falso
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Button3 style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </Button3>
    </View>
  );
};

export default NewPasswordScreen;


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
      marginBottom: 20,
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
      backgroundColor: 'white',
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