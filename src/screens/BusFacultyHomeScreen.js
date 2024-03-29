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

const BusFacultyHomeScreen = ({ navigation }) => {

    const { students, getStudents } = useContext(AppContext)

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    // const [students, setStudents] = useState([])


    const getUserDetails = async () => {
        const email = auth().currentUser.email
        await firestore()
            .collection('Users')
            .doc(email)
            .get()
            .then(async documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    setUser(documentSnapshot.data())
                    await getStudents(documentSnapshot.data().busNo)

                } else {
                    // Alert.alert('Error please try again')
                    navigation.navigate('StudentHome')
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

    const NameItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('FacultyStudentDetails', { studentCode: item.id })} style={styles.nContainer}>
            <Text style={styles.nName}>{item.name}</Text>
            <View style={{ ...styles.nDot, backgroundColor: item.entered ? '#2BA700' : '#DDDEDD' }} />
        </TouchableOpacity>
    )

    const FacultyCard = () => {
        return (
            <ImageBackground source={FCardBg} resizeMode='contain' style={styles.fCard} >
                <Text style={styles.fName}>{user?.name}</Text>
                <Text style={styles.busNo}>Bus No: <Text style={{ color: 'white' }} >{user?.busNo}</Text></Text>
                <Text style={styles.loc}>{user?.route}</Text>
                <View style={styles.fLine} />
            </ImageBackground>
        )
    }

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

            <FacultyCard />

            <ScrollView
                style={styles.nameWrpr}
                showsVerticalScrollIndicator={false}
            >
                {
                    students.map((item, id) => <NameItem key={id + ''} item={item} />)
                }
            </ScrollView>
            <Btn onPress={() => navigation.navigate('QRCodeScanner')} label={'Scan QR Code'} containerStyle={{ marginVertical: 25, }} />

        </View>
    )
}

export default BusFacultyHomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
    fCard: {
        marginTop: 25,
        padding: 22,
        paddingVertical: 28,
        // backgroundColor: '#2A4341',
        borderRadius: 10,
    },
    fName: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white'
    },
    busNo: {
        marginVertical: 8
    },
    loc: {
        marginTop: 15,
        fontSize: 18,
        color: 'white'
    },
    fLine: {
        height: 1,
        backgroundColor: 'white',
        marginVertical: 8
    },
    nameWrpr: {
        marginTop: 35
    },
    nContainer: {
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD'
    },
    nName: {
        color: 'black',
        fontSize: 16
    },
    nDot: {
        width: 20,
        height: 20,
        borderRadius: 100
    }
})