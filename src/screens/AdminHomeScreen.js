import { Alert, ImageBackground, PermissionsAndroid, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import FCardBg from '../assets/images/fCard.png'
import Btn from '../components/Btn'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader'
import { AppContext } from '../context/AppProvider'
import GetLocation from 'react-native-get-location'

const AdminHomeScreen = ({ navigation }) => {

    const { students, getStudents, user, setUser } = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    // const [students, setStudents] = useState([])


    const getUserDetails = async () => {
        const email = auth().currentUser.email
        await firestore()
            .collection('Admins')
            .doc(email)
            .get()
            .then(async documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    setUser({ id: documentSnapshot.id, ...documentSnapshot.data() })

                } else {
                    // Alert.alert('Error please try again')
                    navigation.navigate('ParentHome')
                }
            });

        setLoading(false)
    }

    const updateCurrentLocation = async () => {
        console.log('hereeeee')
        let location = {}
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 60000,
        })
            .then(loc => {
                console.log(loc);
                location = loc
            })

        if (!location.longitude) return
        const email = auth().currentUser.email
        await firestore()
            .collection('Users')
            .doc(email)
            .update({
                location
            })

    }

    const onBackPress = () => {
        Alert.alert('Logout', 'Are you sure want to logout', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => auth().signOut() },
        ]);
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('grantedeeeeeeeeeeeeeeeeeeee', granted);
            if (granted === 'never_ask_again') {
                console.log('You can use Geolocation');
                updateCurrentLocation()
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }
        } catch (err) {
            console.log(err)
            return false;
        }
    };


    useEffect(() => {
        getUserDetails()

    }, [])


    useEffect(() => {
        if (user) {
            requestLocationPermission()
        }
    }, [user])


    if (loading) return <Loader />

    return (
        <View style={styles.container} >
            <Header onBackPress={onBackPress} title={'TripSpark'} />

            <View style={styles.sub} >
                <Btn label='Add Student' onPress={() => navigation.navigate('AddStudent')} />
                <Btn label='Add Bus' onPress={() => navigation.navigate('AddBus')} containerStyle={{ marginVertical: 10 }} />
                <Btn label='View Details' onPress={() => navigation.navigate('Buses')} secondary />
            </View>
        </View>
    )
}

export default AdminHomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
    sub: {
        flex: 1,
        justifyContent: 'center'
    }
})