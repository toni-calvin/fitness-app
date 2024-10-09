import 'react-native-gesture-handler'; // Add this line at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MesocycleScreen from './screens/MesocycleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mesocycle" component={MesocycleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
