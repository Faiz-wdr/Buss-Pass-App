import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Bg from '../assets/images/welcomeScreenBg.png'
import TextInputComp from '../components/TextInputComp'
import Btn from '../components/Btn'
import auth from '@react-native-firebase/auth';
const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')


    const loginHandler = async () => {

        if (!email || !pwd) {
            return Alert.alert('Fill all fields')
        }

        auth()
            .signInWithEmailAndPassword(email, pwd)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return (
        <View
            style={styles.container}
        >

            <ImageBackground source={Bg} resizeMode='cover' style={{ flex: 0.4, paddingLeft: 20 }} imageStyle={{ top: '-80%' }}>
                <View style={styles.overlay} />
                <Text style={styles.title}>TripSpark</Text>
                <Text style={styles.sub}>All in one bus-pass solution for colleges</Text>
            </ImageBackground>

            <View style={styles.subWrpr} >
                <TextInputComp onChangeText={e => setEmail(e)} placeholder='Email' />
                <TextInputComp onChangeText={e => setPwd(e)} placeholder='Password' containerStyle={{ marginTop: 10 }} />
                <Btn onPress={loginHandler} label='Log-In' containerStyle={{ marginTop: 20 }} />
                <TouchableOpacity >
                    <Text style={styles.fgtPwd} >Forgot Password?</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.66);'
    },
    title: {
        marginTop: '50%',
        color: 'white',
        fontSize: 36,
        fontWeight: '700'
    },
    sub: {
        color: 'white'
    },
    subWrpr: {
        padding: 30,
        flex: 0.6,
        justifyContent: 'center'
    },
    fgtPwd: {
        marginTop: 20,
        color: '#2A4341',
        alignSelf: 'center',
    }
})