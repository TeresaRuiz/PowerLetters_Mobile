import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sesion from './src/screens/Sesion';
import SignUp from './src/screens/SignUp';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sesion">
        <Stack.Screen 
          name="Sesion" 
          component={Sesion} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ title: 'Register' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
