import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TickIco from '../assets/icons/tick.png'
const CheckboxComp = ({ disabled, checked, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} >
            <View style={[styles.container, { borderColor: checked ? '#3F938D' : '#2A4341', backgroundColor: disabled ? '#D9DBE1' : 'white' }]} >
                {checked && <Image source={TickIco} style={styles.ico} />}
            </View>
        </TouchableOpacity>
    )
}

export default CheckboxComp

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        borderWidth: 1,
        alignItems: 'center', justifyContent: 'center'
    },
    ico: {
        width: 10,
        height: 20,
        tintColor: "#3F938D"
    }
})