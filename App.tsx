import 'react-native-gesture-handler'; // Add this line at the top
import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';

const Stack = createStackNavigator();

export type CustomScreenProps = {
  navigation: NavigationProp<any>;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
