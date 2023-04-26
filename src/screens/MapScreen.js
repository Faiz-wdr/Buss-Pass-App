import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import Header from '../components/Header'
import { AppContext } from '../context/AppProvider'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MapScreen = () => {

    const { user } = useContext(AppContext)
    const [currentLoc, setCurrentLoc] = useState()
    const mapRef = React.createRef();
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
                        mapRef.current.animateToRegion({
                            latitude: doc.data().location.latitude, longitude: doc.data().location.longitude,
                            latitudeDelta: 0.0158,
                            longitudeDelta: 0.0070
                        })
                    })
                }
            });

    }

    useEffect(() => {
        getBusLocation()
    }, [])

    return (
        <View style={styles.container} >
            <Header title={'Bus Location'} />
            {currentLoc ? <MapView
                initialRegion={{
                    latitude: currentLoc?.latitude, longitude: currentLoc?.longitude, latitudeDelta: 0.0158,
                    longitudeDelta: 0.0070
                }}
                style={{ height: '100%' }}
            >
                {currentLoc && <Marker
                    coordinate={{ latitude: currentLoc?.latitude, longitude: currentLoc?.longitude, }}
                />}
            </MapView> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{color:"#2A4341",fontSize:18}} >Loading Location...</Text>
            </View>}
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1
    }
})