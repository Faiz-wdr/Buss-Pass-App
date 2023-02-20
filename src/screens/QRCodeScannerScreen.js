import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { runOnJS } from 'react-native-reanimated';
const QRCodeScannerScreen = () => {

    const [hasPermission, setHasPermission] = useState(false);
    const devices = useCameraDevices();
    const device = devices.back;
    const [codes, setCodes] = useState([])




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
                console.log('You can use the camera');
                setHasPermission(true)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    function scanQRCodes(frame) {
        'worklet'
        return __scanQRCodes(frame)
    }

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });



    useEffect(() => {
        requestCameraPermission()
    }, [])

    useEffect(() => {
        if (barcodes.length > 0) {
            console.log(barcodes)
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
                            isActive={true}
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