import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Sesion from './src/screens/Sesion';
import Registro from './src/screens/Registro';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sesion">
        <Stack.Screen name="Sesion" component={Sesion} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

