import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputComp = ({ placeholder, containerStyle, onChangeText }) => {
    return (
        <View style={[styles.container, containerStyle]} >
            <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} placeholderTextColor='#CACACA' />
        </View>
    )
}

export default TextInputComp

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBEBEB',
        paddingLeft: 10,
        borderRadius: 10
    },
    input: {
        color: 'black'
    }
})