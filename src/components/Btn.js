import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Btn = ({ onPress, label, containerStyle, secondary, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} style={{ ...styles.container, ...(secondary && { borderWidth: 1, borderColor: '#2A4341', backgroundColor: '#F6F6F6' }), ...containerStyle }} onPress={onPress} >
            <Text style={{ ...styles.label, ...(secondary && { color: '#2A4341' }), }} >{label}</Text>
        </TouchableOpacity>
    )
}

export default Btn

const styles = StyleSheet.create({
    container: {
        padding: 13,
        backgroundColor: '#2A4341',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    label: {
        color: 'white'
    }
})