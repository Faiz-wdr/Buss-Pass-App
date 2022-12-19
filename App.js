import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './src/routes/AuthNav';
const App = () => {
  return (
    <NavigationContainer>
      <AuthNav />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})