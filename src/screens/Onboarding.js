import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    {
      id: '1',
      title: 'Encuentra tus libros favoritos',
      description: 'Accede a una amplia variedad de libros y encuentra tus favoritos fácilmente en Power Letters',
      image: require('../img/onboarding1.png'), // Actualiza con la imagen adecuada
    },
    {
      id: '2',
      title: 'Compra fácil y seguro',
      description: 'Compra tus libros de manera segura y conveniente',
      image: require('../img/onboarding2.png'), // Actualiza con la imagen adecuada
    },
    {
      id: '3',
      title: 'Entrega rápida y segura',
      description: 'Recibe tus libros en la comodidad de tu hogar de manera segura y oportuna',
      image: require('../img/onboarding3.png'), // Actualiza con la imagen adecuada
    },
  ];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate('Sesion');
    }
  };

  const handleBack = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const renderSlide = (slide) => (
    <View style={styles.slide} key={slide.id}>
      <Image source={slide.image} style={styles.image} />
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
  image: {
    width: 350,
    height: 350,
    marginBottom: 40,
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
