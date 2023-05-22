import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import TextInputComp from '../components/TextInputComp'
import Btn from '../components/Btn'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AppContext } from '../context/AppProvider'

const AddBusScreen = ({ navigation }) => {

    const { user } = useContext(AppContext)


    const [busNo, setBusNo] = useState('')
    const [route, setRoute] = useState('')
    const [driverName, setDriverName] = useState('')
    const [email, setEmail] = useState('')
    const submitHandler = async () => {

        if (!busNo || !route || !driverName || !email) return Alert.alert('Fill all details.')

        // await auth().createUserWithEmailAndPassword(email, 'ans12345')
        await firestore()
            .collection('Users')
            .doc(email)
            .set({
                busNo, route, driverName, email, adminId: user.id
            })
            .then(() => {
                console.log('User added!');
                navigation.goBack()
            });
    }

    return (
        <View style={styles.container}>
            <Header title={'TripSpark'} />

            <Text style={styles.title} >Add Bus</Text>
            <View style={styles.sub} >
                <TextInputComp placeholder='Bus No.' keyboardType='numeric' onChangeText={(e) => setBusNo(e)} />
                <TextInputComp placeholder='Bus Route' onChangeText={(e) => setRoute(e)} containerStyle={{ marginVertical: 10 }} />
                <TextInputComp placeholder='Driver Name' onChangeText={(e) => setDriverName(e)} />
                <TextInputComp placeholder='Email' onChangeText={(e) => setEmail(e)} containerStyle={{ marginVertical: 10 }} />



            </View>
            <Btn label='Submit' onPress={submitHandler} />
        </View>
    )
}

export default AddBusScreen

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
    title: {
        marginTop: 25,
        fontSize: 18,
        color: '#2A4341',
        fontWeight: '700'
    },
    sub: {
        marginTop: 25,
        flex: 1,
    }
})