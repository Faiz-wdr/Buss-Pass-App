import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../context/AppProvider';

const BusesScreen = ({ navigation }) => {

    const { user } = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    const [buses, setBuses] = useState([])


    const getBuses = async () => {

        let tmpData = []
        await firestore()
            .collection('Users')
            .where('adminId', '==', user.id)
            .get()
            .then(docSnap => {

                docSnap.forEach((doc) => {
                    tmpData.push({ id: doc.id, ...doc.data() })

                })

            });
        setBuses(tmpData)
        setLoading(false)
    }

    const BusItem = ({ bus }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('BusDetails', { bus })}
            >
                <View style={styles.bWrpr} >
                    <Text style={styles.bTxt} >Bus {bus.busNo}</Text>
                    <Text style={styles.bRoute} >{bus.route}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getBuses()
    }, [])

    return (
        <View style={styles.container} >
            <Header title='Buses' />

            <FlatList
                data={buses}
                renderItem={({ item }) => <BusItem bus={item} />}
            />

        </View>
    )
}

export default BusesScreen

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
    bWrpr: {
        marginTop: 10,
        paddingVertical: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#2A4341"
    },
    bTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    },
    bRoute: {
        marginTop: 25,
        color: 'white',

    }
})