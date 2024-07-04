import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({ name, size, color }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f0ecfc',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default SocialButton;
