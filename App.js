import { NavigationContainer } from '@react-navigation/native'; // Importa el contenedor de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa el creador de stack navigator

import Sesion from './src/screens/Sesion.js'; // Importa la pantalla de Sesión
import SignUp from './src/screens/SignUp.js'; // Importa la pantalla de Registro
import UpdateUser from './src/screens/UpdateUser.js'; // Importa la pantalla de Actualización de Usuario
import TabNavigator from './src/tabNavigator/TabNavigator.js'; // Importa el navegador de pestañas
import Productos from './src/screens/Categorias.js';
import LibroDetalle from './src/screens/LibroDetalle.js';
import Onboarding from './src/screens/Onboarding.js';
import Recuperacion from './src/screens/RecuperacionScreen.js';
export default function App() {

  const Stack = createNativeStackNavigator(); // Crea una instancia del stack navigator

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Onboarding' // Establece 'Sesion' como la ruta inicial
        screenOptions={{
          headerShown: false // Oculta el header por defecto
        }}>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LibroDetalle" component={LibroDetalle} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        <Stack.Screen name="Productos" component={Productos} />
        <Stack.Screen name="Recuperacion" component={Recuperacion} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
