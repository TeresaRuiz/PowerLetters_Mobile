import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform, StyleSheet, View } from 'react-native';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';
import Libros from '../screens/Libros';
import Historial from '../screens/HistorialPedidos';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Oculta el header
          tabBarActiveTintColor: '#5064d4', // Color de los íconos activos
          tabBarInactiveTintColor: '#5865E0', // Color de los íconos inactivos
          tabBarStyle: {
            position: 'absolute',
            bottom: 20, // Eleva la barra de pestañas
            left: 10,
            right: 10,
            elevation: 10, // Sombra en Android
            backgroundColor: '#f0ecfc',
            borderRadius: 15, // Bordes redondeados
            height: Platform.OS === 'ios' ? 80 : 60, // Altura diferente para iOS y Android
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            borderTopWidth: 0,
            shadowOpacity: 0.1, // Sombra en iOS
            shadowOffset: { width: 0, height: -1 },
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            fontSize: 14, // Ajusta el tamaño del texto
          },
          tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Productos') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Carrito') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Libros') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Historial') {
              iconName = focused ? 'book' : 'book-outline';
            }
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: 'Inicio' }}
        />
        <Tab.Screen
          name="Libros"
          component={Libros}
          options={{ title: 'Libros' }}
        />
        <Tab.Screen
          name="Carrito"
          component={Carrito}
          options={{ title: 'Carrito' }}
        />
        <Tab.Screen
          name="Historial"
          component={Historial}
          options={{ title: 'Historial' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ecfc', // Color de fondo para contrastar la barra de pestañas
  },
});

export default TabNavigator;
