import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackIco from '../assets/icons/backIco.png'
import { useNavigation } from '@react-navigation/native'
const Header = ({ title, onBackPress, right }) => {

    const navigation = useNavigation()

    let backPressHandler = () => {
        if (onBackPress) {
            onBackPress()
        } else {

            navigation.goBack()
        }
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={backPressHandler} >
                <Image source={BackIco} style={styles.backIco} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flex: 1 }} />
            {right}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backIco: {
        height: 25,
        width: 25
    },
    title: {
        marginLeft: 10,
        color: '#2A4341',
        fontSize: 22,
        fontWeight: '700',
    }
})