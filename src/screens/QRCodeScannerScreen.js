import { Alert, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { AppContext } from '../context/AppProvider';
const QRCodeScannerScreen = ({ route, navigation }) => {

    // const { students, setStudents } = route.params.state
    const { students, setStudents } = useContext(AppContext)


    const [hasPermission, setHasPermission] = useState(false);
    const devices = useCameraDevices();
    const device = devices.back;
    const [isActive, setIsActive] = useState(true)




    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log('You can use the camera');
                setHasPermission(true)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };



    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });



    useEffect(() => {
        requestCameraPermission()
    }, [])

    useEffect(() => {
        if (barcodes.length > 0) {
            // console.log(barcodes[0].rawValue)
            if (barcodes[0].rawValue.includes('https://www.buspass/student/')) {
                const studentCode = barcodes[0].rawValue.split('/')[4] ?? null

                if (studentCode) {



                    setIsActive(false)

                    // Alert.alert(student.name + ' successfully entered')
                    // navigation.goBack()
                    navigation.navigate('FacultyStudentDetails', { studentCode })
                }
            } else {
                Alert.alert('Not a valid url, Try again')
            }
            // console.log(studentCode)
        }

    }, [barcodes])

    return (
        <View style={styles.container} >
            <Header title={'TripSpark'} />

            {device != null &&
                hasPermission && (
                    <>
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={isActive}
                            frameProcessor={frameProcessor}
                            frameProcessorFps={5}
                        />

                    </>
                )}


        </View>
    )
}

export default QRCodeScannerScreen

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
})