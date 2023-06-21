import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../context/AppProvider';
import Loader from '../components/Loader';
import MapView, { Marker } from 'react-native-maps'
import Btn from '../components/Btn';
import { useIsFocused } from '@react-navigation/native';
const ParentHomeScreen = ({ navigation }) => {

    const mapRef = React.createRef();
    const isFocussed = useIsFocused()
    const { students, getStudents, user, setUser } = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    const [currentLoc, setCurrentLoc] = useState()
    const [student, setStudent] = useState()


    const getBusLocation = async () => {

        await firestore()
            .collection('Users')
            // Filter results
            .where('busNo', '==', user.busNo.toString())
            .get()
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    console.log(user.busNo)
                } else {

                    querySnapshot.forEach((doc) => {
                        setCurrentLoc({ ...doc.data().location })
                        console.log(doc.data().location)
                        mapRef?.current?.animateToRegion({
                            latitude: doc.data().location.latitude, longitude: doc.data().location.longitude,
                            latitudeDelta: 0.0158,
                            longitudeDelta: 0.0070
                        })
                    })
                }
            });

    }

    const getStudent = async () => {

        await firestore()
            .collection('Students')
            .where('busNo', '==', user.busNo.toString())
            .get()
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    console.log(user.busNo)
                } else {

                    querySnapshot.forEach((doc) => {
                        setStudent({ id: doc.id, ...doc.data() })

                    })
                }
            });
        setLoading(false)
    }
    const getUserDetails = async () => {
        const email = auth().currentUser.email
        await firestore()
            .collection('Parents')
            .doc(email)
            .get()
            .then(async documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    setUser({ id: documentSnapshot.id, ...documentSnapshot.data() })

                } else {
                    Alert.alert('Error please try again')
                }
            });


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
    };

    useEffect(() => {
        getUserDetails()
    }, [])
    useEffect(() => {
        if (user && isFocussed) {
            getBusLocation()
            getStudent()
        }
    }, [user, isFocussed])

    if (loading) return <Loader />

    return (
        <View style={styles.container}>
            <View style={{ padding: 18 }}>

                <Header
                    onBackPress={onBackPress}
                    title={'TripSpark'}
                />
            </View>

            {currentLoc ? <MapView
                initialRegion={{
                    latitude: currentLoc?.latitude, longitude: currentLoc?.longitude, latitudeDelta: 0.0158,
                    longitudeDelta: 0.0070
                }}
                style={{ flex: 1 }}
            >
                {currentLoc && <Marker
                    coordinate={{ latitude: currentLoc?.latitude, longitude: currentLoc?.longitude, }}
                />}
            </MapView> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: "#2A4341", fontSize: 18 }} >Loading Location...</Text>
            </View>}

            <View style={styles.textWrpr} >
                <Text style={styles.name} >{student?.name}</Text>
                <Text style={styles.busNo} >Buss No: <Text style={{ color: 'black' }} >{student?.busNo}</Text></Text>
                <Text style={styles.route}>{student?.from} - KMCT</Text>
                <Btn label={'Fee Payment'} onPress={() => navigation.navigate('StudentFeePayment', { from: 'parent', student })} containerStyle={{ marginTop: 20 }} />
            </View>


        </View >
    );

}

export default ParentHomeScreen

const styles = StyleSheet.create({
    container: {
        // padding: 18,
        backgroundColor: '#F6F6F6',
        flex: 1,
    },
    textWrpr: {
        padding: 20,
        backgroundColor: 'white'
    },
    name: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700'
    },
    busNo: {
        color: '#CFCFCF'
    },
    route: {
        color: 'black',
    }
})