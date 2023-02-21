import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './src/routes/AuthNav';
import AppNav from './src/routes/AppNav';
import auth from '@react-native-firebase/auth';


const App = () => {


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppNav /> : <AuthNav />}
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})