import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/book-loading.gif')}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require('./src/img/logo_blanco.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ecfc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
