import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DefaultPic from '../assets/icons/prof.png'
import EditIco from '../assets/icons/edit.png'

const ProfImagePicker = ({ profileImg, setProfileImg }) => {


    const imagePicker = type => {
        try {

            // if (type == 'gallery') {
            //     ImagePicker.clean().catch(e => {
            //         console.log(e);
            //     });
            //     ImagePicker.openPicker({
            //         width: 900,
            //         height: 1200,
            //         cropping: true,
            //     }).then(image => {
            //         setProfileImg({ uri: image.path });


            //     });
            // } else {
            //     ImagePicker.clean().catch(e => {
            //         console.log(e);
            //     });
            //     ImagePicker.openCamera({
            //         width: 900,
            //         height: 1200,
            //         cropping: true,
            //     }).then(image => {
            //         setModalVisible(false);
            //         setProfileImg({ uri: image.path });

            //     });
            // }
            const options = {
                selectionLimit: 1,
                mediaType: 'photo',
                includeBase64: false,

            }
            launchImageLibrary(options, (e) => {
                console.log(e)
                if (!e.didCancel) {
                    setProfileImg({ uri: e?.assets[0]?.uri });
                }

            });
        } catch (error) {

        }
    };
    return (
        <View style={styles.container} >
            <Image source={profileImg ?? DefaultPic} style={styles.prof} />
            <TouchableOpacity style={styles.editWrpr}
                onPress={() => imagePicker('gallery')}
            >
                <Image source={EditIco} style={{ width: 15, height: 15, tintColor: 'blue' }} />
            </TouchableOpacity>
        </View>
    )
}

export default ProfImagePicker

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    prof: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    editWrpr: {
        padding: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 100,
    }
})