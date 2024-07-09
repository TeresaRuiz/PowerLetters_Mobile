import { NavigationContainer } from '@react-navigation/native'; // Importa el contenedor de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa el creador de stack navigator

import Sesion from './src/screens/Sesion.js'; // Importa la pantalla de Sesión
import SignUp from './src/screens/SignUp.js'; // Importa la pantalla de Registro
import UpdateUser from './src/screens/UpdateUser.js'; // Importa la pantalla de Actualización de Usuario
import TabNavigator from './src/tabNavigator/TabNavigator.js'; // Importa el navegador de pestañas
import Productos from './src/screens/Productos.js';
import Onboarding from './src/screens/Onboarding.js';
export default function App() {

  const Stack = createNativeStackNavigator(); // Crea una instancia del stack navigator

  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        <Stack.Screen name="Productos" component={Productos} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
