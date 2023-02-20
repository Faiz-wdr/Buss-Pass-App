import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Btn = ({ onPress, label, containerStyle }) => {
    return (
        <TouchableOpacity style={{ ...styles.container, ...containerStyle }} onPress={onPress} >
            <Text style={styles.label} >{label}</Text>
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