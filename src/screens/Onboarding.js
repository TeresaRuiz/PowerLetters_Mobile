import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [imageAnimation] = useState(new Animated.Value(0));
  // Función para manejar el cambio de diapositiva
  const slides = [
    {
      id: '1',
      title: 'Encuentra tus libros favoritos',
      description: 'Accede a una amplia variedad de libros y encuentra tus favoritos fácilmente en Power Letters',
      image: require('../img/onboarding1.png'),
    },
    {
      id: '2',
      title: 'Compra fácil y seguro',
      description: 'Compra tus libros de manera segura y conveniente',
      image: require('../img/onboarding2.png'),
    },
    {
      id: '3',
      title: 'Entrega rápida y segura',
      description: 'Recibe tus libros en la comodidad de tu hogar de manera segura y oportuna',
      image: require('../img/onboarding3.png'),
    },
  ];

  useEffect(() => {
    startImageAnimation();

    return () => {
      imageAnimation.stopAnimation();
    };
  }, []);

  const startImageAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(imageAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  //Función para mostrar la siguiente pantalla
  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate('Sesion');
    }
  };
  //Función para regresar a la siguiente pantalla
  const handleBack = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  //Función para crear un componente animado
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const renderSlide = (slide) => (
    <View style={styles.slide} key={slide.id}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              {
                scale: imageAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.1, 1],
                }),
              },
              {
                rotate: imageAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '5deg', '0deg'],
                }),
              },
            ],
            opacity: imageAnimation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.7, 1],
            }),
          },
        ]}
      >
        <AnimatedImage source={slide.image} style={styles.image} />
      </Animated.View>
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.description}>{slide.description}</Text>
      <View style={styles.navigationButtons}>
        {currentSlideIndex > 0 && (
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Atrás</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{currentSlideIndex < slides.length - 1 ? 'Adelante' : 'Comenzar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSlide(slides[currentSlideIndex])}
    </View>
  );
};
// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0ecfc',
  },
  imageContainer: {
    marginBottom: 40,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 30,
  },
  navigationButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    width: 100,
    height: 50,
    backgroundColor: '#FF6F61',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding;