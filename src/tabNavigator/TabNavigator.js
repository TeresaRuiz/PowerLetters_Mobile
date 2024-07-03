import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sesion from '../screens/Sesion';
import SignUp from '../screens/SignUp';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Sesion"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Sesion') {
            iconName = 'sign-in';
          } else if (route.name === 'SignUp') {
            iconName = 'user-plus';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Sesion" component={Sesion} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
