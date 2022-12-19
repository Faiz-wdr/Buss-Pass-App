import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputComp = ({ placeholder, containerStyle }) => {
    return (
        <View style={[styles.container, containerStyle]} >
            <TextInput placeholder={placeholder} placeholderTextColor='#CACACA' />
        </View>
    )
}

export default TextInputComp

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBEBEB',
        paddingLeft: 10,
        borderRadius: 10
    }
})