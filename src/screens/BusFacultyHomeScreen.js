import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FCardBg from '../assets/images/fCard.png'
import Btn from '../components/Btn'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader'


const BusFacultyHomeScreen = ({ navigation }) => {


    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])


    const getUserDetails = async () => {
        const email = auth().currentUser.email
        await firestore()
            .collection('Users')
            .doc(email)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    setUser(documentSnapshot.data())
                } else {
                    Alert.alert('Error please try again')
                }
            });

        setLoading(false)
    }


    const onBackPress = () => {
        Alert.alert('Logout', 'Are you sure want to logout', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => auth().signOut() },
        ]);
    }



    const NameItem = ({ item }) => (
        <View style={styles.nContainer}>
            <Text style={styles.nName}>{item.name}</Text>
            <View style={{ ...styles.nDot, backgroundColor: item.entered ? '#2BA700' : '#DDDEDD' }} />
        </View>
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
        if (students.length == 0) {
            setStudents([{ name: 'Isabella Kimon', entered: false, code: 12345 },
            { name: 'Sebastin Varghese', entered: true, code: 586 },
            { name: 'Emma Mathew', entered: false, code: 5648 },
            { name: 'Amelia Nolan', entered: true, code: 789 },
            { name: 'name', entered: false, code: 235 },
            { name: 'name', entered: true, code: 12 },])
        }
        // console.log(students)
    }, [])




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
            <Btn onPress={() => navigation.navigate('QRCodeScanner', { state: { students, setStudents } })} label={'Scan QR Code'} containerStyle={{ marginVertical: 25, }} />

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