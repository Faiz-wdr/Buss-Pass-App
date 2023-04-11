import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusFacultyHomeScreen from '../screens/BusFacultyHomeScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import FacultyStudentDetails from '../screens/FacultyStudentDetails';
import StudentHomePage from '../screens/StudentHomePage';
import QrCodeScreen from '../screens/QrCodeScreen';

const Stack = createNativeStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BusFacultyHome" component={BusFacultyHomeScreen} />
      <Stack.Screen name="StudentHome" component={StudentHomePage} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      <Stack.Screen name="FacultyStudentDetails" component={FacultyStudentDetails} />
      <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} />
    </Stack.Navigator>
  )
}

export default AppNav