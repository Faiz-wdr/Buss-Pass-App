import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Bg from '../assets/images/welcomeScreenBg.png'
import Btn from '../components/Btn';
const WelcomeScreen = ({ navigation }) => {


    return (
        <View style={styles.container} >
            <ImageBackground source={Bg} resizeMode='cover' style={{ flex: 1, padding: 20 }} >
                <View style={styles.overlay} />

                <Text style={styles.title}>TripSpark</Text>
                <Text style={styles.sub}>All in one bus-pass solution for colleges</Text>

                <View style={{ flex: 1 }} />
                <Btn label='Continue' containerStyle={styles.btn} onPress={() => navigation.navigate('Login')} />
            </ImageBackground>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.66);'
    },
    title: {
        marginTop: '30%',
        color: 'white',
        fontSize: 36,
        fontWeight: '700'
    },
    sub: {
        color: 'white'
    },
    btn: {
        bottom: 20,
        width: '90%',
        alignSelf: 'center'

    }
})