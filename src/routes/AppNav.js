import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusFacultyHomeScreen from '../screens/BusFacultyHomeScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import FacultyStudentDetails from '../screens/FacultyStudentDetails';
import StudentHomePage from '../screens/StudentHomePage';
import QrCodeScreen from '../screens/QrCodeScreen';
import MapScreen from '../screens/MapScreen';
import StudentFeePayment from '../screens/StudentFeePayment';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import AddBusScreen from '../screens/AddBusScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import BusesScreen from '../screens/BusesScreen';
import BusDetailsScreen from '../screens/BusDetailsScreen';
import ParentHomeScreen from '../screens/ParentHomeScreen';

const Stack = createNativeStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BusFacultyHome" component={BusFacultyHomeScreen} />
      <Stack.Screen name="StudentHome" component={StudentHomePage} />
      <Stack.Screen name="ParentHome" component={ParentHomeScreen} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      <Stack.Screen name="FacultyStudentDetails" component={FacultyStudentDetails} />
      <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="StudentFeePayment" component={StudentFeePayment} />
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="AddBus" component={AddBusScreen} />
      <Stack.Screen name="AddStudent" component={AddStudentScreen} />
      <Stack.Screen name="Buses" component={BusesScreen} />
      <Stack.Screen name="BusDetails" component={BusDetailsScreen} />
    </Stack.Navigator>
  )
}

export default AppNav