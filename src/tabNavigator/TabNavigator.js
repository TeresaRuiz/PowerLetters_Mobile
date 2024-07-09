import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';
import Libros from '../screens/Libros';
import Historial from '../screens/HistorialPedidos';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header
        tabBarActiveTintColor: '#5064d4', // Color de los íconos activos
        tabBarInactiveTintColor: '#5865E0', // Color de los íconos inactivos
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: Platform.OS === 'ios' ? 80 : 60, // Estilo de la barra de pestañas, altura diferente para iOS y Android
          borderTopWidth: 0
        }, // Estilo de la barra de pestañas
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
          }else if (route.name === 'Historial') {
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
  );
};

export default TabNavigator;
