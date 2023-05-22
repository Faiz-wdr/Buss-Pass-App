import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import QRCode from 'react-native-qrcode-svg'

const QrCodeScreen = ({route}) => {
  const { link } = route?.params ?? {}

  console.log(link)
  return (
    <View style={styles.container}>
      <Header title={'TripSpark'} />
      <View style={{ flex: 1 }} />
      <QRCode
        value={link}
        size={250}
      />
      <View style={{ flex: 1 }} />
    </View>
  )
}

export default QrCodeScreen

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#F6F6F6",
    flex: 1,
    alignItems: 'center',
  },
})