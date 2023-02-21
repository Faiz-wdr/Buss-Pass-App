import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusFacultyHomeScreen from '../screens/BusFacultyHomeScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';

const Stack = createNativeStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BusFacultyHome" component={BusFacultyHomeScreen} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
    </Stack.Navigator>
  )
}

export default AppNav